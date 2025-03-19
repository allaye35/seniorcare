import React, { useEffect, useState } from "react";

const AdminDashboard: React.FC = () => {
    const [users, setUsers] = useState([]);
    const [services, setServices] = useState([]);

    useEffect(() => {
        fetch("/api/admin/users")
            .then((res) => res.json())
            .then((data) => setUsers(data))
            .catch((error) => console.error("Erreur chargement utilisateurs", error));

        fetch("/api/admin/services")
            .then((res) => res.json())
            .then((data) => setServices(data))
            .catch((error) => console.error("Erreur chargement services", error));
    }, []);

    return (
        <div className="admin-dashboard">
            <h1>Tableau de Bord Admin</h1>
            <section>
                <h2>Gestion des Utilisateurs</h2>
                <ul>
                    {users.map((user) => (
                        <li key={user.id}>
                            {user.name} - {user.role} 
                            <button onClick={() => console.log("Changer rôle")}>Changer Rôle</button>
                            <button onClick={() => console.log("Supprimer")}>Supprimer</button>
                        </li>
                    ))}
                </ul>
            </section>
            <section>
                <h2>Gestion des Services</h2>
                <ul>
                    {services.map((service) => (
                        <li key={service.id}>{service.title} - {service.type}</li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default AdminDashboard;
