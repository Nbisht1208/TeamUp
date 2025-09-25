import { Router } from 'express';
import { registerUser,loginUser } from '../controller/user.controller.js';
import { upload } from '../controller/user.controller.js';
import { getAllUsers } from '../controller/user.controller.js';
import authenticateToken from '../middleware/authentication.js';
const router= Router();

router.post('/register',upload.single('resume'),registerUser);
router.post('/login',loginUser);
router.get("/getAllUsers",getAllUsers);
router.get("/profile/:id",authenticateToken,getUserbyId);

export default router;