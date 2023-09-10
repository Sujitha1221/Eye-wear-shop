import express from 'express'
import ratingController from '../controllers/rating.controller.mjs'

const ratingRouter = express.Router();

ratingRouter.get("/", ratingController.getAllRatings);
ratingRouter.post("/", ratingController.addRating);
ratingRouter.patch("/:id", ratingController.updateRatingById);
ratingRouter.delete("/:id", ratingController.deleteRatingById);
ratingRouter.get("/user/:userId", ratingController.getRatingsByUserId);
ratingRouter.get("/product/:productId", ratingController.getRatingsByProductId);
ratingRouter.get("/user/:userId/product/:productId", ratingController.getRatingsByUserIdAndProductId);


export default ratingRouter;