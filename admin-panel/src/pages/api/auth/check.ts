import type { NextApiRequest, NextApiResponse } from 'next';
import { verify } from 'jsonwebtoken';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    verify(token, process.env.JWT_SECRET || 'your-secret-key');
    return res.status(200).json({ message: 'Authenticated' });
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
} 