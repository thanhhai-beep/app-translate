import { NextApiRequest, NextApiResponse } from 'next';
import { verify } from 'jsonwebtoken';

export const withAuth = (handler: Function) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      verify(token, process.env.JWT_SECRET || 'your-secret-key');
      return handler(req, res);
    } catch (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  };
}; 