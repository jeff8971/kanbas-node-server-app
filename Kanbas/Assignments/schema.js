import mongoose from "mongoose";

const assignmentsSchema = new mongoose.Schema({
    title: String,
    description: String,
    course: { type: mongoose.Schema.Types.ObjectId, ref: "CourseModel" },
    availabilityDate: Date,
    dueDate: Date,
    points: Number,
},
    { collection: "assignments" }
);

export default assignmentsSchema;