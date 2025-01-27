import mongoose from "mongoose";

const publicConfessionsSchema = mongoose.Schema({
    confession: String,
})
/* publicConfessionsSchema.index({ createdAt: 1 }, { expireAfterSeconds: 10 }) */
const PublicConfessions = mongoose.model("PublicConfessions",publicConfessionsSchema)

export default PublicConfessions;

