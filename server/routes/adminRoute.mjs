import AdminController from '../controllers/Admincontroller.mjs';
import express from "express";

const AdminRouter = express.Router();

AdminRouter.post('/add', AdminController.createAdmin);
// AdminRouter.get('/',AdminController.getAllAdmins);
AdminRouter.put('/update/:id',AdminController.updateAdminById);
AdminRouter.delete('/delete/:id',AdminController.deleteAdminById);
AdminRouter.get('/get/:id',AdminController.getAdminbyId);
AdminRouter.post('/forgot',AdminController.forgotPassword);
AdminRouter.post('/reset/:id',AdminController.resetPassword);

export default AdminRouter;