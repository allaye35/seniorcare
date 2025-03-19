import axios from 'axios';
import { User, AuthResponse } from '../types/auth';

const API_URL = 'http://localhost:4000/api/auth';

export const signup = async (payload: User): Promise<AuthResponse> => {
    const response = await axios.post(`${API_URL}/signup`, payload);
    return response.data;
};

export const login = async (payload: Omit<User, 'firstName' | 'lastName'>): Promise<AuthResponse> => {
    const response = await axios.post(`${API_URL}/login`, payload);
    return response.data;
};