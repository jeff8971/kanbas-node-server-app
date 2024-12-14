import * as enrollmentsDao from "./dao.js";
export default function EnrollmentRoutes(app) {
    app.get("/api/enrollments/:userId", (req, res) => {
        const { userId } = req.params;
        const enrollments = enrollmentsDao.fatchEnrollmentsByUserID(userId );
        res.json(enrollments);
    });
    app.post("/api/enrollments/:courseId/:userId", (req, res) => {
        const { courseId } = req.params;
        const { userId } = req.params;
        const enrollment = enrollmentsDao.enrollUserInCourse(userId, courseId);
        res.send(enrollment);
    });
    app.delete("/api/enrollments/:courseId/:userId", (req, res) => {
        const { courseId } = req.params;
        const { userId } = req.params;
        const enrollment = enrollmentsDao.unenrollUserInCourse(userId, courseId);
        res.send(enrollment);
    });
    
}