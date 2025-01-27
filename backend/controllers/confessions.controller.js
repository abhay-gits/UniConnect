import UserConfession from "../database/models/userConfession.model.js";
import PublicConfessions from "../database/models/publicConfession.model.js";
export const getConfessions = async (req, res) => {
  /* const confessions = await PublicConfessions.find(); */
  const confessions = await UserConfession.find();
  res.send(confessions);
}

export const postConfessions = async (req, res) => {
  const { confession } = req.body;
  if(!confession) {
    res.send("confession Required")
  }else{
    try{
      await UserConfession.create({ confession });
      res.send("Confession Created");
    }catch(err){
      res.send(err);
    }
  }
}