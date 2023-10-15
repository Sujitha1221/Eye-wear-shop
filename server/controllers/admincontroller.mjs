import Admin from "../models/Admin.mjs";
import logger from "../utils/logger.mjs";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const AdminController = {
  //create driver

  createAdmin: async (req, res) => {
    try {
      const { password, ...adminData } = req.body; // Destructure the password
      const admin = new Admin(adminData);

      // Hash the password asynchronously
      const hashedPassword = await bcrypt.hash(password, 12);

      admin.password = hashedPassword;
      await admin.save();

      res.status(201).json(admin); // You should respond with the admin object, not 'user'
      logger.info(`Admin created successfully`);
    } catch (error) {
      console.error(error); // Log the error to the console for debugging
      res.status(400).json({ message: `Error creating admin` });
      logger.error(`Admin Creation Failed`);
    }
  },
  
  


  updateAdminById: async (req, res) => {
    try {
      const updateAdmin = req.body;
      await Admin.findByIdAndUpdate(req.params.id, updateAdmin);
      res.status(200).send("Done"); //send status
      logger.info(`Admin details updated successfully`);
    } catch (error) {
      logger.error(`Admin update failed`);
      res.status(400).send("failed");
    }
  },

  deleteAdminById: async (req, res) => {
    try {
      await Admin.findByIdAndDelete(req.params.id) //delete
        .then(() => {
          res.status(200).json("success"); //send success message to the frontend
          logger.info(`Admin deleted successfully`);
        });
    } catch (error) {
      logger.error(`Admin delete failed`);
      res.status(400).send("failed");
    }
  },

  getAdminbyId: async (req, res) => {
    let id = req.params.id; //get the id from the request(parameter)

    await Admin.findOne({ _id: `${id}` }) //compare the did with the got id and return the details
      .then((admin) => {
        res.status(200).send({ status: "Admin Details fetched", admin }); //send response as a json object and a status
      })
      .catch((err) => {
        console.log(err.message);

        res
          .status(500)
          .send({
            status: "Error with fetching Admin details",
            error: err.message,
          }); //send error message
      });
  
  },

  forgotPassword : async (req, res) => {
    const { email } = req.body;
  
    try {
      const admin = await Admin.findOne({ email });
  
      if (!admin) {
        return res.status(404).json({ Status: "Admin not found" });
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
        text: `http://localhost:3000/reset/${admin._id}`,
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
                Admin.findByIdAndUpdate({_id: id}, {password: hash})
                .then(u => res.send({Status: "Success"}))
                .catch(err => res.send({Status: err}))
            })
            .catch(err => res.send({Status: err}))
        
    
}
  
};

export default AdminController;
