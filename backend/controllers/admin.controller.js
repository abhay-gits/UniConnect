import UserConfession from "../database/models/userConfession.model.js";

export const getAdminConfessions = async (req, res) => {
  const UserConfessions = await UserConfession.find({status:"pending"})
  console.log(UserConfession);
  res.send(UserConfessions)
}
export const postAdminConfessions = async (req, res) => {
  const { id, status } = req.body;
  try {
    const userConfession = await UserConfession.findOne({_id: id})
    console.log(userConfession)
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