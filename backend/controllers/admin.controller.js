import UserConfession from "../database/models/userConfession.model.js";

export const getAdminConfessions = async (req, res) => {
  const UserConfessions = await UserConfession.find()
  res.send(UserConfessions)
}

export const postAdminConfessions = async (req, res) => {
  res.send("posted");
  /* i get confession Id from frontend in req and then i select the particular confession from
  UserConfession and then add it to public Confession and remove it from user confession */
}