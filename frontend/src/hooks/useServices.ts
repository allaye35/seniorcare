import { useEffect, useState } from 'react'
import { fetchServices } from '../services/serviceService'
import { Service } from '../types/service'

interface FilterState {
    location: string
    availability: string
    serviceType: string
}

export function useServices() {
    const [services, setServices] = useState<Service[]>([])
    const [filteredServices, setFilteredServices] = useState<Service[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const [filters, setFilters] = useState<FilterState>({
        location: '',
        availability: '',
        serviceType: '',
    })

    // 1) Récupération des services
    useEffect(() => {
        async function loadServices() {
            setLoading(true)
            setError(null)
            try {
                const data = await fetchServices() as Service[]
                setServices(data)
                setFilteredServices(data) // par défaut, on affiche tout
                setLoading(false)
            } catch (err: any) {
                setError(err.message || 'Erreur lors du chargement des services.')
                setLoading(false)
            }
        }
        loadServices()
    }, [])

    // 2) Filtrage à chaque mise à jour de filters
    useEffect(() => {
        let result = [...services]

        if (filters.location) {
            result = result.filter((srv) =>
                srv.location.toLowerCase().includes(filters.location.toLowerCase())
            )
        }

        if (filters.availability) {
            result = result.filter((srv) =>
                srv.availability.toLowerCase().includes(filters.availability.toLowerCase())
            )
        }

        if (filters.serviceType) {
            result = result.filter((srv) =>
                srv.type.toLowerCase().includes(filters.serviceType.toLowerCase())
            )
        }

        setFilteredServices(result)
    }, [filters, services])

    // 3) Fonction pour mettre à jour un filtre
    function updateFilter(key: keyof FilterState, value: string) {
        setFilters({ ...filters, [key]: value })
    }

    // On expose
    return {
        services,
        filteredServices,
        loading,
        error,
        filters,
        updateFilter,
    }
}
