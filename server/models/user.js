import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    lastName: {type: String, required: true },
    firstName: {type: String, required: true},
    phoneNumber: { type: String, required:true, unique: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
})

const userModel = mongoose.model("User", userSchema);

export {userModel as User};