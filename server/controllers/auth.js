import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import user from './../models/auth.js';

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await user.findOne({ email });

    if (existingUser) {
      return res.status(404).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await user.create({ name, email, password: hashedPassword });

    const token = jwt.sign({ email: newUser.email, id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1hr' });

    res.status(200).json({ result: newUser, token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;  

  try {
    const existingUser = await user.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ alert: 'User not exist' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ alert: 'Invalid Password' });
    }

    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '1hr' });

    res.status(200).json({ result: existingUser, token });
  } catch (error) {

    res.status(500).json({ message: 'Something went wrong' });
    
  }
};

