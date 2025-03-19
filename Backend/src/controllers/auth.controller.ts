import { Request, Response } from 'express';
import { createUser, findUserByEmail } from '../services/user.service';
import { createToken } from '../utils/jwtUtils';
import { sendVerificationEmail } from '../utils/emailUtils';
import {addToBlacklist} from "../utils/tokenBlacklist";

export const signup = async (req: Request, res: Response) => {
    try {
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        const user = await createUser({ ...req.body, verificationCode });
        await sendVerificationEmail(user.email, verificationCode);
        res.status(201).json({ user, message: 'Verification email sent' });
    } catch (error) {
        if (error instanceof Error) {
            console.error('Erreur lors de l’inscription:', error.message);
            res.status(500).json({ message: 'Erreur lors de l’inscription', error: error.message });
        } else {
            console.error('Erreur inconnue:', error);
            res.status(500).json({ message: 'Erreur inconnue' });
        }
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password, role } = req.body;

    try {
        const user = await findUserByEmail(email);
        if (!user || user.role !== role) {
            res.status(404).json({ message: 'Utilisateur non trouvé' });
            return;
        }

        if (!user.isVerified) {
            res.status(403).json({ message: 'Veuillez vérifier votre email avant de vous connecter', emailNotVerified: true });
            return;
        }

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Mot de passe incorrect' });
            return;
        }

        const token = createToken(user.id);

        res.status(200).json({ user, token });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la connexion', error });
    }
};


export const logout = async (req: Request, res: Response) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
        addToBlacklist(token);
    }
    res.status(200).json({ message: 'Déconnexion réussie' });
};

export const verifyEmail = async (req: Request, res: Response) => {
    const { email, code } = req.body;

    try {
        const user = await findUserByEmail(email);
        if (!user) {
            res.status(404).json({ message: 'Utilisateur non trouvé' });
            return;
        }

        if (user.verificationCode === code) {
            user.isVerified = true;
            user.verificationCode = null;
            await user.save();
            res.status(200).json({ message: 'Email verified successfully' });
        } else {
            res.status(400).json({ message: 'Invalid verification code' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la vérification', error });
    }
};
export const resendVerificationEmail = async (req: Request, res: Response) => {
    const { email } = req.body;

    try {
        const user = await findUserByEmail(email);
        if (!user) {
            res.status(404).json({ message: 'Utilisateur non trouvé' });
            return;
        }

        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        user.verificationCode = verificationCode;
        await user.save();

        await sendVerificationEmail(user.email, verificationCode);
        res.status(200).json({ message: 'Verification email sent' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de l’envoi de l’email de vérification', error });
    }
};