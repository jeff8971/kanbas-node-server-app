import Database from "../Database/index.js";

export function createAssignment(assignment) {
    Database.assignments = [...Database.assignments, assignment];

    return assignment;
}

export function deleteAssignment(assignmentId) {
    Database.assignments = Database.assignments.filter((assignment) => assignment._id !== assignmentId);
}

export function retrieveAssignment(assignmentId) {
    const assignment = Database.assignments.find((assignment) => assignment._id === assignmentId);

    return assignment;
}

export function retrieveCourseAssignments(courseId) {
    const assignments = Database.assignments.filter((assignment) => assignment.course === courseId);

    return assignments;
}

export function updateAssignment(assignmentId, updatedAssignment) {
    const oldAssignment = Database.assignments.find((a) => a._id === assignmentId);

    Object.assign(oldAssignment, updatedAssignment);

    return oldAssignment;
}