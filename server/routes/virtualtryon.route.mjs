import express from "express";
import virtualTryOnController from "../controllers/virtualtryon.controller.mjs";

const virtualTryOnRouter = express.Router();

virtualTryOnRouter.get('/', virtualTryOnController);

export default virtualTryOnRouter;