import mongoose from "mongoose";

const publicConfessionsSchema = mongoose.Schema({
    confession: String,
})

const PublicConfessions = mongoose.model("PublicConfessions",publicConfessionsSchema)

export default PublicConfessions;

