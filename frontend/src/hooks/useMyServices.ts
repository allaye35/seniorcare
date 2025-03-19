import { useState, useEffect } from 'react';
import { Service } from '../types/service';
import {fetchMyServices} from "../services/serviceService.ts";

export function useMyServices() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await fetchMyServices();
                setServices(data);
            } catch (err: any) {
                setError(err.message || 'Erreur lors du chargement des services.');
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    return { services, loading, error };
}
