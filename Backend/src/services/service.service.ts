import { Service } from '../models/Service';
import { CreateServicePayload } from '../types/service';
import { User } from '../models/User';
import AppDataSource from "../config/database";

export class ServiceService {
    private serviceRepository = AppDataSource.getRepository(Service);

    async createService(payload: CreateServicePayload, caregiverId: string): Promise<Service> {
        // Récupérer l'utilisateur aidant (caregiver) depuis la base de données, si nécessaire
        const caregiver = await AppDataSource.getRepository(User).findOneBy({ id: caregiverId });
        if (!caregiver) {
            throw new Error('Caregiver not found');
        }

        const service = new Service();
        service.title = payload.title;
        service.description = payload.description;
        service.type = payload.type;
        service.location = payload.location;
        service.availabilityDate = new Date(payload.availabilityDate);
        service.startTime = payload.startTime;
        service.endTime = payload.endTime;
        service.price = payload.price;
        service.caregiver = caregiver;

        try {
            return await this.serviceRepository.save(service);
        } catch (error) {
            console.error('Erreur lors de l\'enregistrement du service :', error);
            throw new Error('Impossible de créer le service. Veuillez vérifier vos données.');
        }
    }

    async getAllServices(): Promise<Service[]> {
        return await Service.find({ relations: ['caregiver'] }); // Inclure l'aidant
    }

    async getServicesByCaregiver(caregiverId: string): Promise<Service[]> {
        return await Service.find({
            where: { caregiver: { id: caregiverId } },
            relations: ['caregiver'],
        });
    }
    static async getServiceById(id: string) {
        const service = await Service.findOne({
            where: { id },
            relations: ['caregiver'],
        });

        if (!service) {
            throw new Error('Service introuvable');
        }

        return service;
    }
}
