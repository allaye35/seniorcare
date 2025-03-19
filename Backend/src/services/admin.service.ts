import { User } from "../models/User";
import { Service } from "../models/Service";

export const getAllUsers = async () => {
    return await User.find();
};

export const deleteUser = async (id: string) => {
    return await User.delete(id);
};

export const updateUserRole = async (id: string, role: string) => {
    const user = await User.findOne({ where: { id } });
    if (!user) throw new Error("Utilisateur introuvable");

    user.role = role;
    await user.save();
    return user;
};
