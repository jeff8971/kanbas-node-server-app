import express from 'express';
import cors from "cors";
import session from "express-session";
import "dotenv/config";
import mongoose from "mongoose";

import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import UserRoutes from "./Kanbas/Users/routes.js";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import AssignmentRoutes from './Kanbas/Assignments/routes.js';
import PoepleRoutes from './Kanbas/People/routes.js';
import EnrollmentsRoutes from './Kanbas/Enrollments/routes.js';

// Initialize Express App
const app = express();

// MongoDB Connection
const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas"
mongoose.connect(CONNECTION_STRING);

// Configure CORS
app.use(cors({
    credentials: true,
    origin: process.env.NETLIFY_URL || "http://localhost:3000"
}));

// Configure Session
const sessionOptions = {
    secret: process.env.SESSION_SECRET || "super secret session phrase",
    resave: false,
    saveUninitialized: false
};

if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
        domain: process.env.NODE_SERVER_DOMAIN,
    };
}

app.use(session(sessionOptions));

// Parse JSON Requests
app.use(express.json());

// Register Routes
Hello(app);
Lab5(app);
UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
PoepleRoutes(app);
EnrollmentsRoutes(app);

// Start the Server
app.listen(process.env.PORT || 4000)