import User from "../models/User.mjs";
import logger from "../utils/logger.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const UserController = {
  createUser: async (req, res) => {
    try {
      const { password, ...userData } = req.body; // Destructure the password
      const user = new User(userData);

      // Hash the password asynchronously
      const hashedPassword = await bcrypt.hash(password, 12);

      user.password = hashedPassword;
      await user.save();

      res.status(201).json(user);
      logger.info(`User created successfully`);
    } catch (error) {
      res.status(400).json({ message: `Error creating user` });
      logger.error(`User Creation Failed`);
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
      logger.info(`User details fetched`);
    } catch (error) {
      res.status(500).json({ message: error });
      logger.error(`Error getting all users ${error.message}`);
    }
  },

  updateUserById: async (req, res) => {
    try {
      const updateUser = req.body;
      await User.findByIdAndUpdate(req.params.id, updateUser);
      res.status(200).send("Done"); //send status
      logger.info(`User details updated successfully`);
    } catch (error) {
      logger.error(`User update failed`);
      res.status(400).send("failed");
    }
  },

  deleteUserById: async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id) //delete
        .then(() => {
          res.status(200).json("success"); //send success message to the frontend
          logger.info(`User deleted successfully`);
        });
    } catch (error) {
      logger.error(`User delete failed`);
      res.status(400).send("failed");
    }
  },

  getUserbyId: async (req, res) => {
    let id = req.params.id; //get the id from the request(parameter)
  
    await User.findOne({ _id: `${id}` }) //compare the did with the got id and return the details
      .then((user) => {
        res.status(200).send({ status: "User Details fetched", user }); //send response as a json object and a status
      })
      .catch((err) => {
        console.log(err.message);
  
        res.status(500).send({ status: "Error with fetching User details", error: err.message }); //send error message
      });
  },


   userLogin : async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        // User not found
        return res.status(401).json({ error: "Invalid email or password" });
      }
  
      bcrypt.compare(password, user.password, (err, response) => {
        if (err) {
          // Handle bcrypt error
          return res.status(500).json({ error: "Internal Server Error" });
        }
  
        if (response) {
          const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '30d',
          });
          // logger.info(token);
  
          return res.json({ type: "user", user, token });
        } else {
          // Incorrect password
          return res.status(401).json({ error: "Invalid email or password" });
        }
      });
    } catch (e) {
      // Handle other errors
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  forgotPassword : async (req, res) => {
    const { email } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ Status: "User not found" });
      }


      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'nonamenecessary0612@gmail.com',
          pass: 'ekbgdpcvlpdiciws',
        },
        tls: {
          // Allow self-signed certificates
          rejectUnauthorized: false,
        },
      });
  
      const mailOptions = {
        from: 'nonamenecessary0612@gmail.com',
        to: email,
        subject: 'Reset Password Link',
        text: `http://localhost:4000/reset/${user._id}`,
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error:", error);
          return res.status(500).json({ Status: "Error sending email" });
        } else {
          console.log("Email sent:", info.response);
          return res.status(200).json({ Status: "Success" });
        }
      });
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ Status: "Internal Server Error" });
    }
  },

  resetPassword:async (req, res) => {
    const {id} = req.params
    const {password} = req.body


            bcrypt.hash(password, 10)
            .then(hash => {
                User.findByIdAndUpdate({_id: id}, {password: hash})
                .then(u => res.send({Status: "Success"}))
                .catch(err => res.send({Status: err}))
            })
            .catch(err => res.send({Status: err}))
        
    
}


};

export default UserController;
