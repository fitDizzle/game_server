const db = require("../database/models/index");
const User = require('../database/models/User');
const Settings = db.Settings

const jwt = require("jsonwebtoken");

module.exports = {
  register: async (req, res) => {
    try {
      const date = new Date(Date.now());
      const { name, username, password } = req.body;
      const hashed = jwt.sign(password, process.env.passwordSecret);

      let user = await User.findOne({
        where: {
          username,
        },
      });

      if (user) {
        return res.status(400).json({
          success: false,
          msg: "This username is already registered",
        });
      }

      let newUser = await User.create({
        name,
        username,
        password: hashed,
        createdAt: date,
        updatedAt: date,
      });

      await Settings.create({
        username,
        UserId: newUser.id,
        wordSuggestions: 0,
        wordSearch: 0,
        bagCount: 0,
        lifeLines: 0
      })

      return res.status(200).json({
        success: true,
        msg: "You have registered",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send("There was an error with server Registering");
    }
  },
  login: async (req, res) => {
    try {
      console.log("Login");
      const { username, password } = req.body;

      let user = await User.findAll({
        where: {
          username,
        },
      });
      console.log(user[0]);

      if (!user[0]) {
        return res.status(400).json({
          success: false,
          msg: "User does not exist, please register",
        });
      }

      let decryptedPass = await jwt.verify(
        user[0].password,
        process.env.passwordSecret
      );

      if (decryptedPass !== password) {
        return res.status(400).json({
          success: false,
          msg: "Invalid Credentials"
        });
      }

      let token = await jwt.sign(user[0].id, process.env.jwtSecret);

      res.status(200).json({
        success: true,
        msg: "You have logged in",
        token,
        user: {
          name: user[0].name,
          username: user[0].username
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).send("There was an error with server while logging in");
    }
  },
  getUser: async (req, res) => {
    try {
      console.log(req.params, "get user")
      const { token } = req.params

      let decryptedToken = await jwt.verify(token, process.env.jwtSecret)
      let user = await User.findAll({
        where: {
          id: decryptedToken
        }
      })
      if (!user) {
        return res.status(400).json({
          success: false,
          msg: "User not found"
        })
      }
      return res.status(200).json({
        success: true,
        msg: "User information has been loaded",
        user: {
          username: user[0].username,
          name: user[0].name
        }
      })
    } catch (error) {
      console.log(error);
      res.status(500).send("There was an error with server while fetching user");
    }
  }
};
