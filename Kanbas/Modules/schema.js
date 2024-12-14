import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    name: String,
    description: String,
    course: { type: mongoose.Schema.Types.ObjectId, ref: "CourseModel" },
    lessons: [
      {
        id: String,
        name: String,
        description: String,
      }
    ]
  },
  { collection: "modules" }
);
export default schema;

