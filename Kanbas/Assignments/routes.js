import * as dao from "./dao.js";

export default function AssignmentRoutes(app) {
    app.post("/api/assignment", (req, res) => {
        const newAssignment = dao.createAssignment(req.body);

        res.send(newAssignment);
    });
    app.get("/api/assignment/course/:courseId", (req, res) => {
        const { courseId } = req.params;
        const assignments = dao.retrieveCourseAssignments(courseId);

        res.send(assignments);
    });
    app.get("/api/assignment/:assignmentId", (req, res) => {
        const { assignmentId } = req.params;
        const assignment = dao.retrieveAssignment(assignmentId);

        res.send(assignment);
    });
    app.put("/api/assignment/:assignmentId", (req, res) => {
        const { assignmentId } = req.params;
        const updatedAssignment = dao.updateAssignment(assignmentId, req.body);
        if (updatedAssignment) {
            res.send(updatedAssignment); // Send the updated assignment back
        } else {
            res.status(404).send({ error: "Assignment not found" });
        }
    });
    
    app.delete("/api/assignment/:assignmentId", (req, res) => {
        const { assignmentId } = req.params;

        dao.deleteAssignment(assignmentId);

        res.sendStatus(204);
    });
}