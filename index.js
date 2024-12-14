import express from 'express';
import Hello from "./Hello.js";
import Lab5 from './Lab5/index.js';
import UserRoutes from "./Kanbas/Users/routes.js";
import cors from "cors";
import session from "express-session";
import "dotenv/config";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import AssignmentRoutes from './Kanbas/Assignments/routes.js';
import EnrollmentRoutes from './Kanbas/Enrollments/routes.js';
import mongoose from "mongoose";

import cors from 'cors';
// Connect to MongoDB
const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;
mongoose.connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Initialize Express
const app = express();

// CORS Configuration
app.use(cors({
  origin: [
      'http://localhost:3000',
      'https://kanbas-react-web-app-cs5610-fa24-jeff.netlify.app'
  ],
  credentials: true
}));

// Session Configuration
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kanbas",
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
app.use(session(sessionOptions));

// Middleware
app.use(express.json());

// Routes
Hello(app);
Lab5(app);
UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
EnrollmentRoutes(app);

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Internal Server Error' });
});

// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
