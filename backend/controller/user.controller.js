
import multer from 'multer';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import User from '../models/User.js';
import { data } from 'react-router-dom';
const JWT_SECRET = 'your_jwt'
// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + '-' + file.originalname);
  }
});
export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) =>
    file.mimetype === 'application/pdf' ? cb(null, true) : cb(new Error('Only PDF allowed'))

});

// Zod schema
const registerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  course: z.string().min(1),
  semester: z.string().min(1),
  college: z.string().min(1),
  skills: z.string().min(1),
  password: z.string().min(8),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword']
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});



export const registerUser = async (req, res) => {
  try {
    const formData = req.body;
    const {
      name,
      email,
      course,
      semester,
      college,
      skills,
      password,
      confirmPassword
    } = formData;

    // Debug: Log received data
    console.log('Received registration data:', {
      ...formData,
    });

    // Check if user already exists
    if (await User.findOne({ email: email })) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Process skills (convert comma-separated string to array)
    const skillsArr = skills ? skills.split(',').map(skill => skill.trim()) : [];

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 12);

    // Create and save new user with hashed password
    const newUser = await new User({
      name: name,           // ✅ Use destructured variable, not formData.name
      email: email,
      course: course,
      semester: semester,
      college: college,
      skills: skillsArr,
      password: passwordHash,

    }).save();

    console.log('✅ User created successfully:', newUser._id);
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        course: newUser.course,
        semester: newUser.semester,
        college: newUser.college,
        skills: newUser.skills
      }
    });

  } catch (err) {
    if (err instanceof z.ZodError) {
      const first = err.errors[0];
      return res.status(400).json({ message: first.message, field: first.path[0] });
    }
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login controller
export const loginUser = async (req, res) => {

  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      {
        expiresIn: '2h'
      })
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 2 * 60 * 60 * 1000 ,
    });

    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    if (err instanceof z.ZodError) {
      const first = err.errors[0];
      return res.status(400).json({ message: first.message, field: first.path[0] });
    }
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

// Get All Users
export const getAllUsers = async (req, res) => {
  try {
    const user = await User.find().select('-password');
    return res.status(200).json({
      error: false,
      message: 'Users retrieved successfully',
      data: {
        user: user,
        total: user.length,
      }
    });

  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({
      error: true,
      message: 'Failed to retrieve users',
      data: {
        user: [],
        total: 0
      }
    });

  }
}

// Get User by ID
export const getUserbyId = async (req, res) => {
  try {
    id = req.params.id;
    const user = User.findById(id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json({
      error: false,
      message: 'User retrieved successfully',
      data: {
        user: user,
      }
    });
  } catch (error) {
    return res.status(500).json({
      error:true, 
      message: 'Server error',
      data:{
        user:[]
      }
       });
    
  }
  
}