
import model from "./model.js";
export async function findAssignmentsForCourse(courseId) {
    
    return await model.find({ course: courseId });

    // const { assignments } = Database;
    // return assignments.filter((assignment) => assignment.course === courseId);
}

export async function createAssignment(assignment) {
    delete assignment._id;
    return await model.create(assignment);
    // const newAssignment = { ...assignment, _id: Date.now().toString() };
    // Database.assignments = [...Database.assignments, newAssignment];
    // return newAssignment;
}
export async function deleteAssignment(assignmentId) {
    return await model.deleteOne({ _id: assignmentId });
    // const { assignments } = Database;
    // Database.assignments = assignments.filter((assignment) => assignment._id !== assignmentId);
}
export async function updateAssignments(assignmentId, assignmentUpdates) {

    return await model.updateOne({ _id: assignmentId }, assignmentUpdates);

    // const { assignments } = Database;
    // const assignment = assignments.find((assignment) => assignment._id === assignmentId);
    // Object.assign(assignment, assignmentUpdates);
    // return assignment;
}
