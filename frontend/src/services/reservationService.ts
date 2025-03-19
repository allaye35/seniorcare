import { ReservationPayload, ReservationResponse } from '../types/reservation'

/**
 * Mock qui simule la création d’une réservation côté serveur
 */
export async function createReservation(
    payload: ReservationPayload
): Promise<unknown> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Ex : on simule un échec si l’utilisateur met "hours=0" (juste pour l'exemple)
            if (payload.hours <= 0) {
                return reject(new Error('Le nombre d’heures doit être > 0.'))
            }

            // Sinon, succès
            resolve({
                success: true,
                message: `Réservation confirmée pour le service ID ${payload.serviceId}`,
                reservationId: Math.floor(Math.random() * 10000),
            })
        }, 1000)
    })
}
