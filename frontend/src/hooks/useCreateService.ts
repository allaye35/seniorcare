import { useState } from 'react'
import { createService } from '../services/serviceService'
import { CreateServicePayload } from '../types/service'

export function useCreateService() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [serviceCreated, setServiceCreated] = useState<boolean>(false)

    async function publishService(payload: CreateServicePayload) {
        setLoading(true)
        setError(null)
        setServiceCreated(false)
        try {
            const response = await createService(payload)
            setServiceCreated(true)
            return response
        } catch (err: any) {
            setError(err.response?.data?.message || err.message || 'Erreur lors de la création du service.')
            throw err
        } finally {
            setLoading(false)
        }
    }

    return { publishService, loading, error, serviceCreated }
}
