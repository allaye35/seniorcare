export interface LoginPayload {
    email: string;
    password: string;
    role: 'famille' | 'aidant';
}

export interface SignupPayload extends LoginPayload {
    firstName: string;
    lastName: string;
}

export interface AuthResponse {
    user: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        role: 'famille' | 'aidant';
    };
    token: string;
}
