import model from "./model.js";
import mongoose from "mongoose";

export const createUser = async (user) => {
  try {
    if (!user.username || !user.password) {
      throw new Error("Username and password are required");
    }
    delete user._id;
    return await model.create(user);
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
};

export const findAllUsers = () => model.find();
const findUserById = async (userId) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error(`Invalid ObjectId: ${userId}`);
  }

  return model.findById(userId); // Only valid IDs reach here
};

export const findUserByUsername = (username) => model.findOne({ username: username });
export const findUserByCredentials = (username, password) => {
  return model.findOne({ username, password });
};

export const findUsersByRole = (role) => model.find({ role: role });
export const updateUser = (userId, user) => model.updateOne({ _id: userId }, { $set: user });
export const deleteUser = (userId) => model.deleteOne({ _id: userId });

export const findUsersByPartialName = (partialName) => {
  const regex = new RegExp(partialName, "i"); // i is for case-insensitive
  return model.find({
    $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }],
  });
};