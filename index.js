import express from 'express';
import Hello from "./Hello.js"
import Lab5 from './Lab5/index.js';
import UserRoutes from "./Kanbas/Users/routes.js";
import cors from "cors";
import session from "express-session";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import AssignmentRoutes from './Kanbas/Assignments/routes.js';
import EnrollmentRoutes from './Kanbas/Enrollments/routes.js';
import mongoose from "mongoose";
import "dotenv/config";



const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas"
mongoose.connect(CONNECTION_STRING);

// Initialize Express App
const app = express();

const corsOptions = {
    origin: (origin, callback) => {
        const allowedOrigins = [process.env.NETLIFY_URL || "http://localhost:3000"];
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
};


// Configure CORS
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

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
EnrollmentRoutes(app);

// Start the Server
app.listen(process.env.PORT || 4000)