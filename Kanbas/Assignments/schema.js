import mongoose from "mongoose";
const assignmentSchema = new mongoose.Schema(
   {
      title: String,
      description: String,
      course: { type: mongoose.Schema.Types.ObjectId, ref: "CourseModel" },
      due: Date,
      available: Date,
      points: Number,

   },
   { collection: "assignments" }
);
export default assignmentSchema;


