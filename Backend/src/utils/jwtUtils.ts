import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret_key';

export const createToken = (userId: string) => {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });
};
