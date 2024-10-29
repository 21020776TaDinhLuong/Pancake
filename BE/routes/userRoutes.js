import express from 'express';
const router = express.Router();
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  followFanpage,
  unfollowFanpage,
  getFollowedFanpages,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').post(registerUser).get(protect, getUsers);
router.post('/login', authUser);
router.route('/:id').delete(protect, deleteUser).get(protect, getUserById).put(protect, updateUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.post('/follow/:fanpageId', protect, followFanpage);
router.delete('/unfollow/:fanpageId', protect, unfollowFanpage);
router.get('/followed-fanpages',protect, getFollowedFanpages);


export default router;
