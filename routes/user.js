const express = require("express");
const { check, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("../middleware/auth");

const bodyParser = require('body-parser')
const middlewares = [
  bodyParser.urlencoded()
]


const User = require("../model/User");
router.use(bodyParser.urlencoded({ extended: true }));
// SIGNUP
router.post(
    "/signup",
    [
        check("username", "Please Enter a Valid Username")
        .not()
        .isEmpty(),
        check("email", "Please enter a valid email").isEmail(),
        check("password", "Please enter a valid password ").isLength({
            min: 6
        })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const {
            username,
            email,
            password
        } = req.body; // recuperation des elem du body

        try {
            let user = await User.findOne({
                email
            });
            if (user) {
                return res.status(400).json({ // 400 reponse err
                    msg: "User Already Exists"
                });
            }

            user = new User({
                username,
                email,
                password
            });

            const salt = await bcrypt.genSalt(10); // encrypter le mdp
            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = { // retour
                user: {
                    id: user.id // identifiant auto-incremente de mongoDB (detail tech)
                }
            };

            jwt.sign(
                payload,
                "randomString", {
                    expiresIn: 10000 // mesure de secu : delai d'expiration du token
                },
                (err, token) => {
                    if (err) throw err;
                    return res.redirect('/Home');
                }
            );
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Saving"); // au dessus de mes capacités ex: Impossible de se connecter à mongoDB
        }
    }
);

module.exports = router;


// LOGIN

router.post(
  "/login",
  [/*
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
      min: 6
    })*/
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const {
      email,
      password
    } = req.body;

    try {
      let user = await User.findOne({
        email
      });
      if (!user)
        return res.status(400).json({
          message: "User Not Exist"
        });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({
          message: "Incorrect Password !"
        });

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        "secret",
        {
          expiresIn: 3600
        },
        (err, token) => {
          if (err) throw err;
          return res.redirect('/Home');
        }
      );
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: "Server Error"
      });
    }
  }
);



// Recuperer les user connectés

router.get("/me", auth, async (req, res) => {
  try {
    // request.user is getting fetched from Middleware after token authentication
    const user = await User.findById(req.user.id);
   res.json(user);
  } catch (e) {
    res.send({ message: "Error in Fetching user" });
  }
});

module.exports = router;
