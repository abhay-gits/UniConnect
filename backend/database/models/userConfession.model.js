import mongoose from "mongoose";

const userConfessionSchema = new mongoose.Schema({
    confession: String,
})

const UserConfession = mongoose.model("UserConfession", userConfessionSchema);

export default UserConfession;