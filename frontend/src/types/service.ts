// src/types/service.ts
export interface Service {
    id: string; // Correspond à `uuid`
    title: string;
    description: string;
    type: string;
    location: string;
    availabilityDate: string; // Le backend renvoie une date en tant que chaîne JSON
    startTime: string; // Type `time` traité comme chaîne
    endTime: string; // Type `time` traité comme chaîne
    price: number;
    caregiver: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
    }; // L'objet utilisateur lié
}


export interface CreateServicePayload {
    title: string
    description: string
    type: string
    location: string
    availabilityDate: string
    startTime: string
    endTime: string
    price: number
}
