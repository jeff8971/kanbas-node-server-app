import mongoose from "mongoose";

const assignmentsSchema = new mongoose.Schema({
    title: String,
    course: String,
    description: String,
    availabilityDate: String,
    dueDate: String,
    points: Number,
},
    { collection: "assignments" }
);

export default assignmentsSchema;