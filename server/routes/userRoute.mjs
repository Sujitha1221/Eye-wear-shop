import UserController from "../controllers/Usercontroller.mjs";
import express from "express";

const UserRouter = express.Router();

UserRouter.post('/add',UserController.createUser);
UserRouter.get('/',UserController.getAllUsers);
UserRouter.put('/update/:id',UserController.updateUserById);
UserRouter.delete('/delete/:id',UserController.deleteUserById);
UserRouter.get('/get/:id',UserController.getUserbyId);
UserRouter.get('/login',UserController.userLogin)

export default UserRouter;