import Database from "../Database/index.js";

export function fetchEnrollments() {
    return Database.enrollments;
}

export function enrollUserInCourse(userId, courseId) {
    const { enrollments } = Database;

    enrollments.push({ _id: Date.now(), user: userId, course: courseId });
}

export function unenrollUserFromCourse(userId, courseId) {
    const { enrollments } = Database;

    Database.enrollments = enrollments.filter((enrollment) => {
        return !(enrollment.user === userId && enrollment.course === courseId);
    });
}