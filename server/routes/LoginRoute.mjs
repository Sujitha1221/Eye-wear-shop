import LoginController from "../controllers/LoginController.mjs"
import express from "express";

const LoginRouter = express.Router();

LoginRouter.post('/', LoginController.Login);

export default LoginRouter;