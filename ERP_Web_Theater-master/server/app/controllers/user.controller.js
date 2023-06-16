const db = require("../models");
const User = db.user;
const Order = db.order;


exports.getAllUsers = async (req, res) => {
  try{
    const pageAsNumber = Number.parseInt(req.query.page);
    const sizeAsNumber = Number.parseInt(req.query.size);
    let page = 0;
    if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
      page = pageAsNumber;
    }
  
    let size = 10;
    if (
      !Number.isNaN(sizeAsNumber) &&
      !(sizeAsNumber > 10) &&
      !(sizeAsNumber < 1)
    ) {
      size = sizeAsNumber;
    }
  
    let users = await User.findAndCountAll({
      //where: { condition },
      //order: [["performanceName", "desc"]],
     
      limit: size,
      offset: page * size,
    });
    res.status(200).send({
      content: users.rows,
      totalPages: Math.ceil(users.count / Number.parseInt(size)),
    });
  }catch(err){
    console.error(err)
  }
 
};

//3.Get one book publisher
exports.getOneUser =async (req, res) => {
  try{
    let id = req.params.id;
    console.log(id)
    let getOneUser = await User.findOne({
      include:[{
        model:Order,
        as:'order'
      }],
      where:{ id: id },
    });
    res.status(200).send(getOneUser);
  }catch(error){
    
    console.error(error)
  }

};
exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};
exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};
exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};
exports.staffBoard = (req, res) => {
  res.status(200).send("Staff Content.");
};

