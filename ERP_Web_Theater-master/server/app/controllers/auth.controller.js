const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;

// const passport=require("passport");
// const LocalStrategy=require("passport-local").Strategy;
// const JwtStrategy=require("passport-jwt").Strategy;
// const ExtractJwt=require("passport-jwt").ExtractJwt;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const stripe=require('stripe')('sk_test_51LIW2ZFxQfTuV41Y5i9igpVIsqqo3LLsaY4yDV59eRdn03UHOvmIKyQbQsYZ9p7c0aQS0KcBD1VYlBEApCtbWAwp00TsnBdNaD');


//Configure the local strategy for username/password authentication
// passport.use(
//   new LocalStrategy(
//     {
//       usernameField: "username", 
//     },
//     (username, password, done) => {
//       User.findOne({ where: { username: username } })
//         .then((user) => {
//           console.log('auth user',user)
//           if (!user) {
//             return done(null, false, { message: "User Not found." });
//           }

//           var passwordIsValid = bcrypt.compareSync(password, user.password);
//           if (!passwordIsValid) {
//             return done(null, false, { message: "Invalid Password!" });
//           }

//           return done(null, user);
//         })
//         .catch((err) => done(err));
//     }
//   )
// );

// // Configure the JWT strategy for token-based authentication
// passport.use(
//   new JwtStrategy(
//     {
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       secretOrKey: config.secret, // Provide your secret key here
//     },
//     (payload, done) => {
//       console.log('payload',payload)
//       User.findByPk(payload.id)
//         .then((user) => {
//           if (user) {
//             done(null, user);
//           } else {
//             done(null, false);
//           }
//         })
//         .catch((err) => done(err, false));
//     }
//   )
// );



exports.signup = (req, res) => {
  // Save User to Database
  try{
    User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    })
      .then((user) => {
  
        stripe.customers.create({email:user.email}).then((customer)=>{
          console.log('customer',customer)
          user.stripeCustomerId=customer.id;
          user.save();
  
          if (req.body.roles) {
            Role.findAll({
              where: {
                name: {
                  [Op.or]: req.body.roles,
                },
              },
            }).then((roles) => {
              user.setRoles(roles).then(() => {
                res.send({ message: "User was registered successfully!" });
              });
            });
          } else {
            // user role = 1
            user.setRoles([1]).then(() => {
              res.send({ message: "User was registered successfully!" });
            });
          }
        }).catch((err) => {
          res.status(500).send({ message: err.message });
        })
        }).catch((err) => {
        res.status(500).send({ message: err.message });
      });
  }catch(error){
    console.error(error)
  }
 
};

// exports.signin = (req, res, next) => {
//   passport.authenticate("local", { session: false }, (err, user, info) => {
//     if (err) {
//       return res.status(500).send({ message: err.message });
//     }
// console.log('user login',req.user)
//     if (!user) {
//       return res.status(401).send({ message: info.message });
//     }

//     req.logIn(user, { session: false }, (err) => {
//       if (err) {
//         return res.status(500).send({ message: err.message });
//       }

//       if (!user.stripeCustomerId) {
//         stripe.customers
//           .create({
//             email: user.email,
//             // Additional customer information can be added here
//           })
//           .then((customer) => {
//             // Save the customer ID to the user object in your database
//             console.log('customer',customer)
//             user.stripeCustomerId = customer.id;
//             user.save();

//             // Continue with the rest of your code...
//           })
//           .catch((err) => {
//             res.status(500).send({ message: err.message });
//           });
//           }

//       var token = jwt.sign({ id: user.id }, config.secret, {
//         expiresIn: 86400, // 24 hours
//       });

//       var authorities = [];
//       user.getRoles().then((roles) => {
//         for (let i = 0; i < roles.length; i++) {
//           authorities.push("ROLE_" + roles[i].name.toUpperCase());
//         }

//         res.status(200).send({
//           id: user.id,
//           username: user.username,
//           email: user.email,
//           roles: authorities,
//           accessToken: token,
//         });
//       });
//     });
//   })(req, res, next);
// };

exports.signin = (req, res) => {
 try{
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
console.log('user',user)
      if(!user.stripeCustomerId){
        stripe.customers.create({
          email:user.email,
         // customer:user.username
        }).then((customer)=>{
          user.stripeCustomerId=customer.id;
          user.save()
        }).catch((err) => {
          res.status(500).send({ message: err.message });
        });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });
      var authorities = [];
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token,
        });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
 }catch(error){
  console.error(error)
 }
 
};
