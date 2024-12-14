import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";
import * as assignmentsDao from "../Assignments/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";
export default function CourseRoutes(app) {


    app.get("/api/courses", async (req, res) => {
        try {
            const courses = await dao.findAllCourses();
            res.send(courses);
        } catch (error) {
            res.status(500).send({ error: "Failed to fetch courses" });
        }
    });

    app.delete("/api/courses/:courseId", async (req, res) => {
        try {
            const { courseId } = req.params;
            const status = await dao.deleteCourse(courseId);
            res.send(status);
        } catch (error) {
            res.status(500).send({ error: "Failed to delete course" });
        }
    });

    app.put("/api/courses/:courseId", async (req, res) => {
        try {
            const { courseId } = req.params;
            const courseUpdates = req.body;
            const status = await dao.updateCourse(courseId, courseUpdates);
            res.send(status);
        } catch (error) {
            res.status(500).send({ error: "Failed to update course" });
        }
    });

    app.get("/api/courses/:courseId/modules", async (req, res) => {
        try {
            const { courseId } = req.params;
            const modules = await modulesDao.findModulesForCourse(courseId);
            res.json(modules);
        } catch (error) {
            res.status(500).send({ error: "Failed to fetch modules" });
        }
    });

    app.post("/api/courses/:courseId/modules", async (req, res) => {
        try {
            const { courseId } = req.params;
            const module = {
                ...req.body,
                course: courseId,
            };
            const newModule = await modulesDao.createModule(module);
            res.send(newModule);
        } catch (error) {
            res.status(500).send({ error: "Failed to create module" });
        }
    });

    app.get("/api/courses/:courseId/assignments", async (req, res) => {
        try {
            const { courseId } = req.params;
            const assignments = await assignmentsDao.findAssignmentsForCourse(courseId);
            res.json(assignments);
        } catch (error) {
            res.status(500).send({ error: "Failed to fetch assignments" });
        }
    });

    app.post("/api/courses/:courseId/assignments", async (req, res) => {
        try {
            const { courseId } = req.params;
            const assignment = {
                ...req.body,
                course: courseId,
            };
            const newAssignment = await assignmentsDao.createAssignment(assignment);
            res.send(newAssignment);
        } catch (error) {
            res.status(500).send({ error: "Failed to create assignment" });
        }
    });

    app.post("/api/courses", async (req, res) => {
        const course = await dao.createCourse(req.body);
        const currentUser = req.session["currentUser"];
        if (currentUser) {
            await enrollmentsDao.enrollUserInCourse(currentUser._id, course._id);
        }

        res.json(course);
    });

    const findUsersForCourse = async (req, res) => {
        const { cid } = req.params;
        const users = await enrollmentsDao.findUsersForCourse(cid);
        res.json(users);
    };
    app.get("/api/courses/:cid/users", findUsersForCourse);

}
