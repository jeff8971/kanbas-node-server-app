import "dotenv/config";
import cors from "cors";
import dotenv from 'dotenv';
import express from 'express';
import mongoose from "mongoose";
import session from "express-session";

import AssignmentRoutes from "./Kanbas/Assignments/routes.js";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import EnrollmentsRoutes from "./Kanbas/Enrollments/routes.js";
import Hello from "./Hello.js"
import Lab5 from "./Lab5/index.js";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import UserRoutes from "./Kanbas/Users/routes.js";

const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas"
const app = express();

dotenv.config();

mongoose.connect(CONNECTION_STRING);
app.use(express.json());

app.use(cors());

const sessionOptions = {
    secret: process.env.SESSION_SECRET || "xr7kHlX6IX6HQHI",
    resave: false,
    saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
        domain: process.env.NODE_SERVER_DOMAIN,
    };
}
app.use(
    session(sessionOptions)
);

Hello(app);
Lab5(app);
AssignmentRoutes(app);
CourseRoutes(app);
EnrollmentsRoutes(app);
ModuleRoutes(app);
UserRoutes(app);

app.listen(process.env.PORT || 4000)