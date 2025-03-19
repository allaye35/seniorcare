import React, { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { useLogin } from '../hooks/useLogin';
import { useSignup } from '../hooks/useSignup';
import { User, AuthResponse } from '../types/auth';
import axios from 'axios';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    error: string | null;
    login: (payload: Omit<User, 'firstName' | 'lastName'>) => Promise<AuthResponse>;
    signup: (payload: User) => Promise<AuthResponse>;
    logout: () => void;
    resendVerificationEmail: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const { login: loginUser, loading: loginLoading, error: loginError, emailNotVerified } = useLogin();
    const { signup: signupUser, loading: signupLoading, error: signupError } = useSignup();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');
        if (storedUser && storedToken) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error('Error parsing stored user data:', error);
                localStorage.removeItem('user');
                localStorage.removeItem('token');
            }
        }
    }, []);

    // ✅ VERSION CORRIGÉE DU LOGIN
    const login = async (payload: Omit<User, 'firstName' | 'lastName'>): Promise<AuthResponse> => {
        const response = await loginUser(payload);

        if (!response.user.role) {
            console.error("Erreur : le rôle de l'utilisateur n'est pas défini !");
            return response;
        }

        setUser(response.user);
        localStorage.setItem('user', JSON.stringify(response.user)); // Stocke l'utilisateur avec le rôle
        localStorage.setItem('token', response.token);

        return response;
    };

    const signup = async (payload: User): Promise<AuthResponse> => {
        const response = await signupUser(payload);
        return response;
    };

    const resendVerificationEmail = async (email: string) => {
        await axios.post('http://localhost:4000/api/auth/resend-verification-email', { email });
    };

    const logout = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                await axios.post('http://localhost:4000/api/auth/logout', {}, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            }
        } catch (error) {
            console.error('Erreur lors de la déconnexion:', error);
        } finally {
            setUser(null);
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            localStorage.removeItem('remember');
        }
    };

    const loading = loginLoading || signupLoading;
    const error = loginError || signupError;

    return (
        <AuthContext.Provider value={{ user, loading, error, emailNotVerified, login, signup, logout, resendVerificationEmail }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
