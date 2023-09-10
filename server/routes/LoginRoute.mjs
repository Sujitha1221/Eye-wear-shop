import LoginController from "../controllers/LoginController.mjs"
import express from "express";

const LoginRouter = express.Router();

LoginRouter.get('/', LoginController.Login);

export default LoginRouter;