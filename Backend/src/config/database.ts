import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { User } from '../models/User';
import {Service} from "../models/Service";

dotenv.config();

const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost', // Assurez-vous que c'est "localhost" si en local
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '0000',
    database: process.env.DB_NAME || 'seniorcare',
    entities: [User, Service],
    migrations: ['./dist/src/migrations/*.js'],
    synchronize: true, // À désactiver en production
});

export default AppDataSource;
