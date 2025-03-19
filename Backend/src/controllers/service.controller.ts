import { Request, Response } from 'express';
import { ServiceService } from '../services/service.service';
import {Service} from "../models/Service";

const serviceService = new ServiceService();

export async function createService(req: Request, res: Response): Promise<void> {
    try {
        const caregiverId = req.user?.id;
        if (!caregiverId) {
             res.status(401).json({ message: 'Non autorisé' });
            return;
        }

        const payload = req.body;
        const newService = await serviceService.createService(payload, caregiverId);
         res.status(201).json(newService);
        return;
    } catch (error) {
        console.error('Erreur lors de la création du service:', error);
        res.status(500).json({ message: 'Erreur lors de la création du service', error });
    }
}

export async function getAllServices(req: Request, res: Response) {
    try {
        const services = await serviceService.getAllServices();
        res.status(200).json(services);
        return;
    } catch (error) {
        console.error('Erreur lors de la récupération des services:', error);
         res.status(500).json({ message: 'Erreur lors de la récupération des services.' });
         return;
    }
}

export async function getServicesByCaregiver(req: Request, res: Response) {
    console.log('Utilisateur connecté (req.user):', req.user);

    const caregiverId = req.user?.id;
    if (!caregiverId) {
        res.status(401).json({ message: 'Non autorisé' });
        return;
    }

    try {
        const services = await serviceService.getServicesByCaregiver(caregiverId);
        console.log('Services récupérés:', services);
        res.status(200).json(services);
    } catch (error) {
        console.error('Erreur lors de la récupération des services:', error);
        res.status(500).json({ message: 'Erreur interne' });
    }
}

export async function getServiceById(req: Request, res: Response) {
    try {
        const {id} = req.params;
        const service = await ServiceService.getServiceById(id);
        res.status(200).json(service);
        return;
    } catch (error) {
        if (error instanceof Error && error.message === 'Service introuvable') {
            res.status(404).json({message: error.message});
            return;
        }
        res.status(500).json({message: 'Erreur lors de la récupération du service', error});
        return;
    }
}
