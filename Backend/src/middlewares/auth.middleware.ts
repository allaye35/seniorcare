import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import {User} from "../models/User";
import {isTokenBlacklisted} from "../utils/tokenBlacklist";

const JWT_SECRET = process.env.JWT_SECRET || 'secret_key';

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

export const authenticateJWT = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        console.log('Aucun token reçu');
        res.status(401).json({ message: 'Accès non autorisé' });
        return;
    }

    if (isTokenBlacklisted(token)) {
        console.log('Token blacklisté:', token);
        res.status(403).json({ message: 'Token invalide' });
        return;
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
        console.log('Payload décodé:', decoded);

        const user = await User.findOne({ where: { id: decoded.userId } });
        if (!user) {
            console.log('Utilisateur non trouvé pour l’ID:', decoded.userId);
            res.status(401).json({ message: 'Utilisateur non trouvé' });
            return;
        }

        console.log('Utilisateur authentifié:', user.id);
        req.user = user;
        next();
    } catch (error) {
        console.error('Erreur lors de la vérification du token:', error);
        res.status(403).json({ message: 'Token invalide' });
        return;
    }
};

