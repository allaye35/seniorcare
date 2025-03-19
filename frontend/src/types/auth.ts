export interface User {
    id?: string;
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
    role: 'famille' | 'aidant' | 'admin'; // Ajout de 'admin'
    remember?: boolean;
}


export interface AuthResponse {
    user: User;
    token: string;
}
