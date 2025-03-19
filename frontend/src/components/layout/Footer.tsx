import React from 'react'

const Footer: React.FC = () => {
    return (
        <footer className="bg-white border-t text-center p-4 text-sm text-gray-500">
            © {new Date().getFullYear()} SeniorCare - Tous droits réservés.
        </footer>
    )
}

export default Footer
