import UserConfession from "../database/models/userConfession.model.js";
import NoticeModel from "../database/models/notices.model.js";

/* GET Confessions */
export const getAdminConfessions = async (req, res) => {
  const UserConfessions = await UserConfession.find({status: {$in:["pending","approved"]}})
  res.send(UserConfessions)
}
/* POST Confessions */
export const putAdminConfessions = async (req, res) => {
  const { id, status } = req.body;
  try {
    const userConfession = await UserConfession.findOne({_id: id})
    if(!userConfession){
      return res.status(404).json({message:"Confession with this ID not found"})
    }
    userConfession.status = status;
    await userConfession.save();
    res.send("Its now Public");
  } catch (error) {
    console.log("error in PUT admin controller",error)
  }
}
/* DELETE Confessions */
export const deleteAdminConfessions = async(req,res) =>{
  const {id} = req.params;
  try {
    await UserConfession.findByIdAndDelete(id);
    res.status(200).json({ message: "Confession deleted successfully" });
  } catch (error) {
    console.log(error)
  }
}

/* GET Notices */
export const getAdminNotice = async(req,res) =>{
  const notice = await NoticeModel.find()
  res.send(notice)  
}
/* POST Notices */
export const putAdminNotice = async(req,res) =>{
  const {id,status} = req.body;
  const notice = await NoticeModel.findById(id)
  notice.status = status
  await notice.save()
}
/* DELETE Notices */
export const deleteAdminNotice = async(req,res) =>{
  const {id} = req.params;
  await NoticeModel.findByIdAndDelete(id)
}