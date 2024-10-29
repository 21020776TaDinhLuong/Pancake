import express from 'express';
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';

const router = express.Router();
// @desc    Follow a fanpage
// @route   POST /api/users/follow/:fanpageId
// @access  Private
const followFanpage = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const fanpageId = req.params.fanpageId;

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    if (!user.followedFanpages.includes(fanpageId)) {
      user.followedFanpages.push(fanpageId);
      await user.save();
      res.json({ message: 'Followed the fanpage', followedFanpages: user.followedFanpages });
    } else {
      res.status(400);
      throw new Error('Already following this fanpage');
    }
  } catch (error) {
    console.error(error); // Log the error to the console
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Unfollow a fanpage
// @route   DELETE /api/users/unfollow/:fanpageId
// @access  Private
const unfollowFanpage = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const fanpageId = req.params.fanpageId;

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    if (user.followedFanpages.includes(fanpageId)) {
      user.followedFanpages = user.followedFanpages.filter(id => id.toString() !== fanpageId);
      await user.save();
      res.json({ message: 'Unfollowed the fanpage', followedFanpages: user.followedFanpages });
    } else {
      res.status(400);
      throw new Error('Not following this fanpage');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});
// @desc    Get followed fanpages
// @route   GET /api/users/followed-fanpages
// @access  Private
const getFollowedFanpages = async (req, res) => {
  try {
      const userId = req.user._id; // Ensure req.user is defined

      const user = await User.findById(userId).populate('followedFanpages');

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      console.log('Followed fanpages:', user.followedFanpages); // Check the output

      return res.json(user.followedFanpages);
  } catch (error) {
      console.error('Error fetching followed fanpages:', error);
      return res.status(500).json({ message: 'Server Error' });
  }
};






// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({ name, email, password });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export {
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
};


