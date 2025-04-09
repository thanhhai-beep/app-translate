import type { NextApiRequest, NextApiResponse } from 'next';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';

// Default admin credentials
const ADMIN_EMAIL = 'admin@example.com';
const ADMIN_PASSWORD = '$2a$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu.Vm'; // hashed 'password123'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  if (email !== ADMIN_EMAIL) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const isValidPassword = await compare(password, ADMIN_PASSWORD);
  if (!isValidPassword) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // Create JWT token
  const token = sign(
    { email },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '1d' }
  );

  // Set HTTP-only cookie
  res.setHeader(
    'Set-Cookie',
    `token=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Strict`
  );

  return res.status(200).json({ message: 'Login successful' });
} 