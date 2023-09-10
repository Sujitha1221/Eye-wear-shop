import User from "../models/User.mjs";
import logger from "../utils/logger.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

  // router.route("/getDid/:id").get(async (req, res) => {
  //   let id = req.params.id; //get the id from the request(parameter)
  
  //   await DeliveryDriver.findOne({ did: `${id}` }) //compare the did with the got id and return the details
  //     .then((dd) => {
  //       res.status(200).send({ status: "DD Details fetched", dd }); //send response as a json object and a status
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  
  //       res.status(500).send({ status: "Error with fetching DD details", error: err.message }); //send error message
  //     });
  // });

  userLogin: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email: email });

      if (user) {
        bcrypt.compare(password, user.password, (err, response) => {
          if (response) {
            res.json({type:"user",user});
          } else {
            res.json("Invalid Password");
          }
        });
      }
      else{
        res.json("Invalid email");

      }
    } catch (e) {
      res.json("No");
    }
  },

//   forgotPassword:async (req, res) => {
//     const {email} = req.body;
//     User.findOne({email: email})
//     .then(user => {
//         if(!user) {
//             return res.send({Status: "User not existed"})
//         } 
        
//         var transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//               user: 'nonamenecessary0612@gmail.com',
//               pass: 'ekbgdpcvlpdiciws'
//             }
//           });
          
//           var mailOptions = {
//             from: 'nonamenecessary0612@gmail.com',
//             to: email,
//             subject: 'Reset Password Link',
//             text: `http://localhost:4000/reset/${user._id}/`
//           };
          
//           transporter.sendMail(mailOptions, function(error, info){
//             if (error) {
//               console.log(error);
//             } else {
//               return res.send({Status: "Success"})
//             }
//           });
//     })
// },

// resetPassword:async (req, res) => {
//   const {id} = req.params
//   const {password} = req.body

//           bcrypt.hash(password, 10)
//           .then(hash => {
//               UserModel.findByIdAndUpdate({_id: id}, {password: hash})
//               .then(u => res.send({Status: "Success"}))
//               .catch(err => res.send({Status: err}))
//           })
//           .catch(err => res.send({Status: err}))
      
  
// }
};

export default UserController;
