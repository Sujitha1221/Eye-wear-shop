import { Router } from "express";

import {
  assignDelivery,
  getAllDelivery,
  getDeliveryByID,
  updateDeliveryDriverId,
  updateDeliveryStatus,
  deleteDelivery,
  getDeliveryByDriverID
} from "../controllers/DeliveryController.mjs";

const route = Router();

route.post("/assign-delivery", assignDelivery);
route.get("/get-all-delivery", getAllDelivery);
route.get("/get-delivery-by-id/:id", getDeliveryByID);
route.get("/get-delivery-by-driver-id/:id", getDeliveryByDriverID);
route.put("/update-delivery-driver-id", updateDeliveryDriverId);
route.put("/update-delivery-status", updateDeliveryStatus);
route.delete("/delete-delivery/:id", deleteDelivery);

export default route;
