import { useState } from 'react';
import { login } from '../services/authService';
import { User, AuthResponse } from '../types/auth';

export const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [emailNotVerified, setEmailNotVerified] = useState<boolean>(false);

    const loginUser = async (payload: Omit<User, 'firstName' | 'lastName'>): Promise<AuthResponse> => {
        setLoading(true);
        setError(null);
        setEmailNotVerified(false);
        try {
            const response = await login(payload);
            setLoading(false);
            return response; // Retourne l'utilisateur connecté avec le token
        } catch (err: any) {
            setLoading(false);
            setError(err.response?.data?.message || 'Erreur lors de la connexion.');
            if (err.response?.data?.emailNotVerified) {
                setEmailNotVerified(true);
                console.log("emailNotVerified mis à jour :", true);
            }
            throw err;
        }
    };

    return { login: loginUser, loading, error, emailNotVerified };
};