const route = require('express').Router();
const { assignDelivery,
    getAllDelivery,
    getDeliveryByID,
    updateDeliveryDriverId,
    updateDeliveryStatus,
    deleteDelivery } = require('../controllers/DeliveryController');

route.post("/assign-delivery",assignDelivery);
route.get("/get-all-delivery", getAllDelivery);
route.get("/get-delivery-by-id", getDeliveryByID); 
route.put("/update-delivery-driver-id", updateDeliveryDriverId); 
route.put("/update-delivery-status", updateDeliveryStatus); 
route.delete("/delete-delivery-driver/:id", deleteDelivery); 

module.exports = route;