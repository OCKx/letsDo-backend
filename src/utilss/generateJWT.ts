import jwt, { JwtPayload } from "jsonwebtoken";

const generateJWT = async (payload: JwtPayload): Promise<string> => {
  const secretKey = process.env.JWT_SECRET_KEY;
  if (!secretKey) {
    throw new Error("JWT_SECRET_KEY is not defined in environment variables.");
  }

  try {
    const token = jwt.sign(payload, secretKey, { expiresIn: '90d' });
    return token;
  } catch (error) {
    throw new Error(`Error generating JWT: ${error.message}`);
  }
};


export default generateJWT;