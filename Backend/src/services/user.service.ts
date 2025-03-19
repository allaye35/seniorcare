import { User } from '../models/User';
import AppDataSource from '../config/database';

export const createUser = async (userData: Partial<User>): Promise<User> => {
    const userRepository = AppDataSource.getRepository(User);
    const user = userRepository.create(userData);
    return await userRepository.save(user);
};


export const findUserByEmail = async (email: string): Promise<User | null> => {
    const userRepository = AppDataSource.getRepository(User); // Utilise le référentiel
    const user = await userRepository.findOne({ where: { email } });
    return user; // Retourne directement l'utilisateur ou null
};
