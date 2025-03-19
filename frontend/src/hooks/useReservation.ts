import { useState } from 'react'
import { createReservation } from '../services/reservationService'
import { ReservationPayload, ReservationResponse } from '../types/reservation'

export function useReservation() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [reservationResponse, setReservationResponse] = useState<ReservationResponse | null>(null)

    async function reserveService(payload: ReservationPayload) {
        setLoading(true)
        setError(null)
        setReservationResponse(null)

        try {
            const response = await createReservation(payload) as ReservationResponse
            setReservationResponse(response)
            setLoading(false)
            return response
        } catch (err: any) {
            setLoading(false)
            setError(err.message || 'Une erreur est survenue lors de la réservation.')
            throw err
        }
    }

    return {
        loading,
        error,
        reservationResponse,
        reserveService,
    }
}
