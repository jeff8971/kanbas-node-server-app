import model from "./model.js";
export async function findModulesForCourse(courseId) {
    // const { modules } = Database;
    // return modules.filter((module) => module.course === courseId);
    return await model.find({ course: courseId }).populate("course");
}

export async function createModule(module) {
    // const newModule = { ...module, _id: Date.now().toString() };
    // Database.modules = [...Database.modules, newModule];
    // return newModule;
    delete module._id
    return await model.create(module);
}
export async function deleteModule(moduleId) {
    // const { modules } = Database;
    // Database.modules = modules.filter((module) => module._id !== moduleId);
    return await model.deleteOne({ _id: moduleId });
}
export async function updateModule(moduleId, moduleUpdates) {
    // const { modules } = Database;
    // const module = modules.find((module) => module._id === moduleId);
    // Object.assign(module, moduleUpdates);
    // return module;
    return await model.updateOne({ _id: moduleId }, moduleUpdates);
}
