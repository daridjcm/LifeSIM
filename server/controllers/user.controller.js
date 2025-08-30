import db from '../models/index.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

const { User } = db;
const JWT_SECRET = process.env.JWT_SECRET;

const getBloodType = (id) => {
  const letters = ['A', 'B', 'AB', 'O'];
  const randomLetter = letters[Math.floor(Math.random() * letters.length)];
  const rh = id % 2 === 0 ? '+' : '-';
  return `${randomLetter}${rh}`;
};

// #region SignUp
export const createUser = async (req, res) => {
  const { username, email, password, gender } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      gender,
    });

    const token = jwt.sign({ id: newUser.id }, JWT_SECRET, { expiresIn: '1h' });
    const blood_type = getBloodType(newUser.id);
    await newUser.update({ blood_type });

    res
      .status(200)
      .json({
        message: 'User created successfully',
        token,
        user: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
          gender: newUser.gender,
        },
      });
  } catch (error) {
    res.status(500).json({ message: 'Error during signup' });
  }
};

// #region Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });

    res
      .status(200)
      .json({
        message: 'Login successful.',
        token,
        user: { id: user.id, username: user.username, email: user.email },
      });
  } catch (error) {
    res.status(500).json({ message: 'Error during login' });
  }
};

// #region Get Current User
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.user_id); // Fetch user data based on decoded user ID from token

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Error fetching user' });
  }
};

// #region Update User
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { blood_type } = req.body;

  try {
    const user = await User.findByPk(id);

    if (!user) return res.status(404).json({ error: 'User not found' });

    user.blood_type = blood_type;
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Error updating user blood type' });
  }
};
