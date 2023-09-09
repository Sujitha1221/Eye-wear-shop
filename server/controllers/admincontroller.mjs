import Admin from "../models/Admin.mjs";
import logger from "../utils/logger.mjs";
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
  
  

  // getAllAdmins: async (req, res) => {
  //   try {
  //     const drivers = await Driver.find();
  //     res.status(200).json(drivers);
  //     logger.info(`Driver details fetched`);
  //   } catch (error) {
  //     res.status(500).json({ message: error });
  //     logger.error(`Error getting all drivers ${error.message}`);
  //   }
  // },

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

  getAdminbyId: async (req,res) => {
    try{
        const admin = await Admin.findById(req.params.id);
        res.status(200).json(admin);
        logger.info(`Admin data fetched successfully `)

    }catch (error) {
      logger.error(`Couldn't get admin details`);
      res.status(400).send("failed");
    }
  }
  
};

export default AdminController;
