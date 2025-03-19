import { useState } from 'react';
import { signup } from '../services/authService';
import { User, AuthResponse } from '../types/auth';

export const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const signupUser = async (payload: User): Promise<AuthResponse> => {
        setLoading(true);
        setError(null);
        try {
            const response = await signup(payload);
            setLoading(false);
            return response; // Retourne l'utilisateur créé avec le token
        } catch (err: any) {
            setLoading(false);
            setError(err.response?.data?.message || 'Erreur lors de l’inscription.');
            throw err;
        }
    };

    return { signup: signupUser, loading, error };
};
