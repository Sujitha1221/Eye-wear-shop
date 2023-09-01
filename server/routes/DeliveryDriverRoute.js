const route = require('express').Router();
const { registerDeliveryDriver, 
    getDeliveryDriverByEmail, 
    getAllDeliveryDrivers, 
    getDeliveryDriverByID,
    updateDeliveryDriver,
    deleteDeliveryDriver,
    getMinNumberOfOrder } = require('../controllers/DeliveryDriverController');

route.post("/register-delivery-driver",registerDeliveryDriver);
route.get("/get-delivery-driver-by-email", getDeliveryDriverByEmail);
route.get("/get-all-delivery-drivers", getAllDeliveryDrivers);
route.get("/get-delivery-driver-by-id", getDeliveryDriverByID); 
route.put("/update-delivery-driver", updateDeliveryDriver); 
route.delete("/delete-delivery-driver/:id", deleteDeliveryDriver); 
route.get("/get-min-order-driver", getMinNumberOfOrder);

module.exports = route;