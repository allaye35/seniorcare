export interface ReservationPayload {
    serviceId: number
    date: string
    hours: number
    paymentMethod: 'carte' | 'paypal'

}

export interface ReservationResponse {
    success: boolean
    message: string
    reservationId?: number
}
