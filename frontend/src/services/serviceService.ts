import { CreateServicePayload, Service } from '../types/service';
import axios from 'axios';

const BASE_URL = 'http://localhost:4000/api';

/**
 * Appelle l'API pour récupérer tous les services.
 * Si l'API échoue, retourne les données mockées comme fallback.
 * @returns Liste de services
 */
export async function fetchAllServices(): Promise<Service[]> {
    try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error("Token d'authentification manquant");

        const response = await axios.get(`${BASE_URL}/services/all`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des services, utilisation des données mockées.', error);
        return; // Fallback aux données mockées
    }
}

/**
 * Appelle l'API pour récupérer les services créés par l'utilisateur connecté (aidant).
 * @returns Liste de services créés par l'utilisateur
 */
export async function fetchMyServices(): Promise<Service[]> {
    const token = localStorage.getItem('token');
    if (!token) throw new Error("Token d'authentification manquant");

    const response = await axios.get(`${BASE_URL}/services/my-services`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
}

/**
 * Appelle l'API pour créer un nouveau service.
 * @param payload - Les données du service à créer
 * @returns Le service créé
 */
export async function createService(payload: CreateServicePayload): Promise<Service> {
    const token = localStorage.getItem('token');
    if (!token) throw new Error("Token d'authentification manquant");

    const response = await axios.post(`${BASE_URL}/services/create`, payload, {
        headers: {
            Authorization: `Bearer ${token}`, // Inclure le token dans l'en-tête
        },
    });

    return response.data;
}

export async function fetchServiceById(id: string | undefined): Promise<Service> {
    const token = localStorage.getItem('token');
    if (!token) throw new Error("Token d'authentification manquant");

    const response = await axios.get(`${BASE_URL}/services/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
}

// Données mockées utilisées en fallback
const mockServices: ({
    price: number;
    description: string;
    location: string;
    id: number;
    availability: string;
    title: string;
    type: string;
    caregiverName: string
})[] = [
    {
        id: 1,
        title: 'Aide au repas',
        description: 'Préparation et aide à la prise de repas',
        type: 'Repas',
        location: 'Paris',
        availability: 'Matin',
        price: 20,
        caregiverName: 'Marie Dupont',
    },
    {
        id: 2,
        title: 'Sortie Parc',
        description: 'Accompagnement en balade extérieure',
        type: 'Compagnie',
        location: 'Lyon',
        availability: 'Après-midi',
        price: 25,
        caregiverName: 'Alex Martin',
    },
    {
        id: 3,
        title: 'Soins infirmiers légers',
        description: 'Soins de base type pansements et suivi',
        type: 'Soins',
        location: 'Paris',
        availability: 'Matin & Après-midi',
        price: 35,
        caregiverName: 'Lucie Bernard',
    },
];
// Simule un appel async pour récupérer les services
export async function fetchServices(): Promise<unknown> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockServices)
        }, 500)
    })
}