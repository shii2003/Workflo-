import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { connectDB } from "./config/db.js";
import authRoutes from './routes/auth.route.js'
import cors from 'cors';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(express.json());

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_DB_CONNECTION_URI,
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24, // 1 day
        },
    })
);

app.use('/api/auth', authRoutes)


app.listen(PORT, () => {
    connectDB()
    console.log(`Server is running on PORT ${PORT}`)
}) 