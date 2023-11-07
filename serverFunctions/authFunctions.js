const User = require('../database/models/User');
const Settings = require('../database/models/Settings');
const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");

module.exports = {
  // register: async (req, res) => {
  //   try {
  //     const date = new Date(Date.now());
  //     const { name, username, password } = req.body;
  //     const hashed_password = jwt.sign(password, process.env.passwordSecret);

  //     let user = await User.findOne({
  //       where: {
  //         username,
  //       },
  //     });

  //     if (user) {
  //       return res.status(400).json({
  //         success: false,
  //         msg: "This username is already registered",
  //       });
  //     }

  //     let newUser = await User.create({
  //       name,
  //       username,
  //       password: hashed_password,
  //       createdAt: date,
  //       updatedAt: date,
  //     });

  //     await Settings.create({
  //       username,
  //       UserId: newUser.id,
  //       wordSuggestions: 0,
  //       wordSearch: 0,
  //       bagCount: 0,
  //       lifeLines: 0
  //     })

  //     return res.status(200).json({
  //       success: true,
  //       msg: "You have registered",
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).send("There was an error with server Registering");
  //   }
  // },
  register: async (req, res) => {
    try {
      const date = new Date(Date.now());
      const { name, username, password } = req.body;
      const hashed_password = jwt.sign(password, process.env.passwordSecret);

      // Check if the username is already registered
      const existingUser = await User.findOne({
        where: {
          username,
        },
      });

      if (existingUser) {
        return res.status(400).json({
          success: false,
          msg: "This username is already registered",
        });
      }

      // Create a new user and associated settings in a single call
      const newUser = await User.create(
        {
          name,
          username,
          password: hashed_password,
          createdAt: date,
          updatedAt: date,
          Settings: {
            username,
            wordSuggestions: 0,
            wordSearch: 0,
            bagCount: 0,
            lifeLines: 0,
          },
        },
        {
          include: [Settings], // Include the associated Settings model
        }
      );

      return res.status(200).json({
        user: newUser,
        success: true,
        msg: "New user registration successful",
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
      const { token } = req.params

      // Verify the JWT token and get the user information
      // const decodedToken = jwt.verify(token, process.env.jwtSecret);
      // const user = await User.findByPk(decodedToken);
      let decryptedToken = await jwt.verify(token, process.env.jwtSecret);
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
