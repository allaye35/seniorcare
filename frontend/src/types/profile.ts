export interface CaregiverProfile {
    id: string
    firstName: string
    lastName: string
    email: string
    phone?: string
    bio?: string
    photoUrl?: string
}

export interface FamilyProfile {
    id: string
    firstName: string
    lastName: string
    email: string
    phone?: string
    preferences?: {
        preferredLocation?: string
        serviceTypes?: string[]
    }
    photoUrl?: string
}