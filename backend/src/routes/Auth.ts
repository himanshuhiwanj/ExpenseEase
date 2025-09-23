import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User, IUser } from '../models/Schema.js';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer'; // To send emails
import crypto from 'crypto';

// Extend the Request interface to include a user property for our middleware
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

// In-memory store for OTPs
// In a production app, consider using a database like Redis for persistence and scalability
const otpStore: { [email: string]: { code: string; expiry: number } } = {};

// Helper function to generate a JWT token
const generateToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: '30d',
  });
};

// --- Nodemailer Setup ---
// Configure your email service provider here.
// Use environment variables for security.
const transporter = nodemailer.createTransport({
    service: 'gmail', // or 'smtp', 'SendGrid', etc.
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
});

/**
 * @desc    Send OTP to user's email
 * @route   POST /api/users/send-otp
 * @access  Public
 */
export const sendOtp = async (req: Request, res: Response) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    try {
        const otp = crypto.randomInt(100000, 999999).toString();
        const expiry = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes

        otpStore[email] = { code: otp, expiry };

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your OTP for Account Verification',
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                    <h2 style="color: #4CAF50;">Hello!</h2>
                    <p>Your One-Time Password (OTP) for account verification is:</p>
                    <p style="font-size: 24px; font-weight: bold; color: #1a1a1a; background-color: #f4f4f4; padding: 10px; border-radius: 5px; text-align: center;">
                        ${otp}
                    </p>
                    <p>This OTP is valid for 10 minutes. Please do not share this with anyone.</p>
                    <p>If you did not request this, please ignore this email.</p>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'OTP sent successfully!' });

    } catch (error: any) {
        console.error('Error sending OTP:', error);
        res.status(500).json({ message: 'Failed to send OTP', error: error.message });
    }
};

/**
 * @desc    Register a new user
 * @route   POST /api/users/register
 * @access  Public
 */
export const registerUser = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password, otp } = req.body;

  if (!firstName || !lastName || !email || !password || !otp) {
    return res.status(400).json({ message: 'Please enter all fields, including OTP' });
  }

  // --- OTP Verification ---
  const storedOtpData = otpStore[email];
  if (!storedOtpData || storedOtpData.code !== otp || Date.now() > storedOtpData.expiry) {
    return res.status(400).json({ message: 'Invalid or expired OTP' });
  }

  // Delete the OTP after successful verification to prevent reuse
  delete otpStore[email];

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({
      firstName,
      lastName,
      email,
      password,
    });

    await user.save();

    const token = generateToken(user._id!.toString());

    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token,
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * @desc    Authenticate user & get token
 * @route   POST /api/users/login
 * @access  Public
 */
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    // A small fix to your User model is needed to add the matchPassword method.
    // I'll assume that exists for this file.
    const isMatch = await bcrypt.compare(password, user.password as string);
    if (!isMatch) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const token = generateToken(user._id!.toString());

    res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token,
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * @desc    Protect routes
 * @access  Private (middleware)
 */
export const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };

      const user = await User.findById(decoded.id).select('-password');
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      req.user = user;
      next();
    } catch (error) {
      // ADD THE 'return' STATEMENT HERE
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    // THIS BLOCK ALREADY HAS A 'return'
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};
