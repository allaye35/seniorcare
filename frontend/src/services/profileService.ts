import {CaregiverProfile, FamilyProfile} from '../types/profile'

let mockProfile: CaregiverProfile = {
    id: '123',
    firstName: 'Marie',
    lastName: 'Dupont',
    email: 'marie.dupont@example.com',
    phone: '0123456789',
    bio: 'Aide expérimentée dans les soins aux personnes âgées...',
    photoUrl: 'https://randomuser.me/api/portraits/women/1.jpg'
}

export async function fetchProfile(): Promise<unknown> {
    return new Promise((resolve) => {
        setTimeout(() => resolve(mockProfile), 500)
    })
}

export async function updateProfile(updatedProfile: CaregiverProfile): Promise<unknown> {
    return new Promise((resolve) => {
        setTimeout(() => {
            mockProfile = { ...mockProfile, ...updatedProfile }
            resolve(mockProfile)
        }, 500)
    })
}

let mockFamilyProfile: FamilyProfile = {
    id: '456',
    firstName: 'Alice',
    lastName: 'Martin',
    email: 'alice.martin@example.com',
    phone: '0987654321',
    preferences: {
        preferredLocation: 'Paris',
        serviceTypes: ['Soins', 'Repas'],
    },
    photoUrl: '',
}

export async function fetchFamilyProfile(): Promise<unknown> {
    return new Promise((resolve) => {
        setTimeout(() => resolve(mockFamilyProfile), 500)
    })
}

export async function updateFamilyProfile(updatedProfile: FamilyProfile): Promise<unknown> {
    return new Promise((resolve) => {
        setTimeout(() => {
            mockFamilyProfile = { ...mockFamilyProfile, ...updatedProfile }
            resolve(mockFamilyProfile)
        }, 500)
    })
}
