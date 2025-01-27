import mongoose from "mongoose";

const userConfessionSchema = new mongoose.Schema({
    confession: String,
}, { timestamps: true } )
/* userConfessionSchema.index({ createdAt: 1 }, { expireAfterSeconds: 50 }) */
const UserConfession = mongoose.model("UserConfession", userConfessionSchema);

export default UserConfession;