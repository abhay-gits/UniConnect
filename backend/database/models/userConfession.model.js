import mongoose from "mongoose";

const userConfessionSchema = new mongoose.Schema({
    confession: String,
}, { timestamps: true } )

const UserConfession = mongoose.model("UserConfession", userConfessionSchema);

export default UserConfession;