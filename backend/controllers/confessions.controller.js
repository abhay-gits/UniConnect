import UserConfession from "../database/models/userConfession.model.js";

export const getConfessions = async (req, res) => {
  try {
    const confessions = await UserConfession.find({status:'approved'});
    res.send(confessions);
  } catch (error) {
    console.log("Error in the GET confession controller", error)
  }
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