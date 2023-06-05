const config = require("../config/db.config.js");
const { Sequelize, DataTypes } = require("sequelize");
const { DB } = require("../config/db.config.js");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: 0,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});
sequelize.sync()
  //.authenticate()
  .then(() => {
    console.log("Connected..");
  })
  .catch((err) => {
    console.error("Error " + err);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//BOOK WEB SHOP
db.bookgenre = require("../models/bookgenre.model.js")(sequelize, DataTypes);
db.bookAuthor = require("./bookauthor.model.js")(sequelize, DataTypes);
db.bookLanguage = require("./booklanguage.model.js")(sequelize, DataTypes);
db.bookPublisher = require("./bookpublisher.model.js")(sequelize, DataTypes);
db.book = require("./book.model.js")(sequelize, DataTypes);
db.orderItem = require("./bookorderitem.model.js")(sequelize, DataTypes);
db.order = require("./bookorder.model.js")(sequelize, DataTypes);
db.user = require("./user.model.js")(sequelize, DataTypes);

//Relationship between tables

//one to many relation between book and author
db.bookAuthor.hasMany(db.book, {
  foreignKey: "bookAuthorId",
  as: "book",
});

db.book.belongsTo(db.bookAuthor, {
  foreignKey: "bookAuthorId",
  as: "bookAuthor",
});

//one to many relation between book and publisher
db.bookPublisher.hasMany(db.book, {
  foreignKey: "bookPublisherId",
  as: "book",
});

db.book.belongsTo(db.bookPublisher, {
  foreignKey: "bookPublisherId",
  as: "bookPublisher",
});

 //one to many relation between book and genre
db.bookgenre.hasMany(db.book, {
  foreignKey: "bookGenreId",
  as: "book",
});

db.book.belongsTo(db.bookgenre, {
  foreignKey: "bookGenreId",
  as: "bookGenre",
});

 //one to many relation between book and language
 db.bookLanguage.hasMany(db.book, {
  foreignKey: "bookLanguageId",
  as: "book",
});

db.book.belongsTo(db.bookLanguage, {
  foreignKey: "bookLanguageId",
  as: "bookLanguage",
});

 //one to many relation between book and order item
 db.orderItem.hasMany(db.book, {
  foreignKey: "orderItemId",
  as: "book",
});

db.book.belongsTo(db.orderItem, {
  foreignKey: "orderItemId",
  as: "orderItem",
});


//one to many relation between oreder item and order 
db.order.hasMany(db.orderItem, {
  foreignKey: "orderId",
  as: "orderItem",
});

db.orderItem.belongsTo(db.order, {
  foreignKey: "orderId",
  as: "order",
});

//one to many relation between oreder item and order 
db.user.hasMany(db.order, {
  foreignKey: "userId",
  as: "order",
});

db.order.belongsTo(db.user, {
  foreignKey: "userId",
  as: "user",
});









//db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);



//meny to many relation between user and role
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});

db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId",
});

//Database
db.sequelize.sync({ force: false }).then(() => {
  console.log("yes re-sync done!");
});

db.ROLES = ["user", "admin", "staff"];

module.exports = db;
