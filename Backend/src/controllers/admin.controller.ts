import { Request, Response } from 'express';
import { getAllUsers, deleteUser, updateUserRole } from '../services/admin.service';
import { getAllServices } from '../services/service.service';

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs", error });
    }
};

export const removeUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await deleteUser(id);
        res.status(200).json({ message: "Utilisateur supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression de l'utilisateur", error });
    }
};

export const changeUserRole = async (req: Request, res: Response) => {
    try {
        const { id, role } = req.body;
        const updatedUser = await updateUserRole(id, role);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la mise à jour du rôle", error });
    }
};

export const getAllAdminServices = async (req: Request, res: Response) => {
    try {
        const services = await getAllServices();
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des services", error });
    }
};
