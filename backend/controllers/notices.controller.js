import noticeModel from "../database/models/notices.model.js"

export const postNotices = async(req,res)=>{
    const {title} = req.body
    const {body} = req.body
    try {
        await noticeModel.create({title, body})
        res.send("Posted, wait for admin approval")
    } catch (error) {
        console.error('error in notice controller',error)
    }
}


export const getNotices = async(req,res)=>{
    try {
        const notices = await noticeModel.find({status: 'approved'})
        res.send(notices)
        /* res.send("notices") */
    } catch (error) {
        console.error('error in notice controller in getNotices',error)
    }
}