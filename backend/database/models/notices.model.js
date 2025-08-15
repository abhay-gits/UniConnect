import mongoose from "mongoose";

const noticesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String, 
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

const NoticeModel = mongoose.model('noticeModel', noticesSchema)

export default NoticeModel;