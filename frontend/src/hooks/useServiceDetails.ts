import { useState, useEffect } from 'react';
import { fetchServiceById } from '../services/serviceService';
import { Service } from '../types/service';

export function useServiceDetails(serviceId: string | undefined) {
    const [service, setService] = useState<Service | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!serviceId) {
            setError('ID de service invalide.');
            setLoading(false);
            return;
        }

        async function fetchData() {
            try {
                const fetchedService = await fetchServiceById(serviceId);
                setService(fetchedService);
            } catch (err: any) {
                setError('Erreur lors du chargement du service.');
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [serviceId]);

    return { service, loading, error };
}
