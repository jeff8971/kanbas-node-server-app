import * as enrollmentsDao from "./dao.js"

export default function EnrollmentsRoutes(app) {
    app.get("/api/enrollments/all", (req, res) => {
        const enrollments = enrollmentsDao.fetchEnrollments();

        res.send(enrollments);
    });
    app.post("/api/enrollments/add/:userId/:courseId", (req, res) => {
        const { userId, courseId } = req.params;
    
        enrollmentsDao.enrollUserInCourse(userId, courseId);
    
        console.log("Enrollment added:", { userId, courseId });
        res.sendStatus(200);
    });
    
    app.post("/api/enrollments/remove/:userId/:courseId", (req, res) => {
        const { userId, courseId } = req.params;

        enrollmentsDao.unenrollUserFromCourse(userId, courseId);

        res.sendStatus(200);
    });
}