import express from 'express';
import dotenv from 'dotenv';
import AppDataSource from './config/database';
import authRoutes from './routes/auth.routes';
import 'reflect-metadata';
import cors from 'cors';
import serviceRoutes from "./routes/service.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware CORS - doit être placé avant les routes
app.use(cors({
    origin: 'http://localhost:5173', // Origine autorisée (frontend)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Méthodes HTTP autorisées
    credentials: true, // Permet d'envoyer les cookies dans les requêtes CORS
}));

// Middleware pour analyser les requêtes JSON
app.use(express.json());

// Routes API
app.use('/api/auth', authRoutes);

app.use('/api/services', serviceRoutes);


// Initialisation de la base de données
AppDataSource.initialize()
    .then(() => {
        console.log('Database connected');
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Erreur lors de la connexion à la base de données:', error);
    });
