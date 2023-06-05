const express = require("express");
const cors = require("cors");
const app = express();
var corsOptions = {
  origin: "http://localhost:8081",
};

//const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
const bodyParser = require("body-parser");

//middleware
app.use(cors(corsOptions));
//app.use("/api/checkout");

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

//BOOK


require("./app/routes/bookGenre.routes")(app);
require("./app/routes/bookAuthor.routes")(app);
require("./app/routes/bookLanguage.routes")(app);
require("./app/routes/bookPublisher.routes")(app);
require("./app/routes/book.routes")(app);
require("./app/routes/orderItem.routes")(app);
require("./app/routes/orderItem.routes")(app);
require("./app/routes/order.routes")(app);
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/stripe.routes")(app);
require("./app/routes/webhook.routes")(app);

//database
const db = require("./app/models");
const dbConfig = require("./app/config/db.config");
const Role = db.role;

// process.on('unhandledRejection', (reason, p) => {
//   console.error('Unhandled Rejection at:', p, 'reason:', reason)
//   process.exit(1)
// });

//testing api
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Web Shop Theater application." });
});

//port, listen for request
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

//  db.sequelize.sync({ force: true }).then(() => {
//   console.log("yes re-sync done!");
//   initial();
// }); 

// function initial() {
//   Role.create({
//     id: 1,
//     name: "user",
//   });

//   Role.create({
//     id: 2,
//     name: "staff",
//   });

//   Role.create({
//     id: 3,
//     name: "admin",
//   });
// }
