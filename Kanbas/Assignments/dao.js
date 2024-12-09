import model from "./model.js";

export function findAllAssignments() {
    return model.find();
}

export function createAssignment(assignment) {
    delete assignment._id;

    return model.create(assignment);
}

export function deleteAssignment(assignmentId) {
    return model.deleteOne({ _id: assignmentId });
}

export function updateAssignment(assignmentId, updatedAssignment) {
    return model.updateOne({ _id: assignmentId }, updatedAssignment);
}

export function retrieveAssignment(assignmentId) {
    const assignment = model.findOne({ _id: assignmentId });

    return assignment;
}

export function retrieveCourseAssignments(courseId) {
    return model.find({ course: courseId });
}