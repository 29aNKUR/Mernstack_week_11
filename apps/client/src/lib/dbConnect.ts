import mongoose from "mongoose";
let alreadyDone = false;

export async function ensureDbConnected() {
    if(alreadyDone){
        return;
    }
    await mongoose.connect('mongodb+srv://semleankur:H4E0brZsHzWzki13@cluster0.lo7ookf.mongodb.net/courses', {dbName: "courses" });
    alreadyDone = true;
}