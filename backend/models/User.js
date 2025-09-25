// const mongoose = require('mongoose');
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  course: String,
  semester: String,
  college: String,
  skills: [String],
  resumeUrl: String,
  password: { type: String, required: true }
}, { timestamps: true });

const user = mongoose.model('User', userSchema);
export default user;
