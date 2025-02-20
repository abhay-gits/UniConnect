import mongoose from "mongoose";

const userConfessionSchema = new mongoose.Schema({
    confession: String,
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    }
}, { timestamps: true } )

const UserConfession = mongoose.model("UserConfession", userConfessionSchema);

export default UserConfession;