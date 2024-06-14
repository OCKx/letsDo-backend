import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
  user?: string | JwtPayload;
}

const verifyJWT = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.sendStatus(401); // Unauthorized
    }

    const secretKey = process.env.JWT_SECRET_KEY as string;
    if (!secretKey) {
      throw new Error('JWT_SECRET_KEY is not defined in environment variables.');
    }

    const user = await new Promise<JwtPayload | string>((resolve, reject) => {
      jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          return reject(err);
        }
        resolve(decoded as JwtPayload);
      });
    });

    req.user = user;
    next();
  } catch (error) {
    console.error('Error verifying JWT:', error);
    if (error.name === 'TokenExpiredError' || error.name === 'JsonWebTokenError') {
      return res.sendStatus(403);
    }
    return res.sendStatus(500);
  }
};


export default verifyJWT;