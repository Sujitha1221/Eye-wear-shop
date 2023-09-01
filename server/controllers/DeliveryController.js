const Delivery = require('../models/Delivery');


const assignDelivery = async (req, res) => {
    const { paymentId, driverId, address, phoneNumber } = req.body;

    Delivery.create({ paymentId, driverId, address, phoneNumber, status:'Accepted', lastModifiedDateTime: new Date() })
        .then((Delivery) => {
            console.log({ status: 'Success', Delivery });
            res.json(Delivery);
            //console.log({status: 'Success'});
        })
        .catch((err) => {
            console.log({ status: 'Error', err });
        })
}

const getAllDelivery = async (req, res) => {
    Delivery.find()
        .then((Delivery) => {
            res.json(Delivery);
        })
        .catch((err) => {
            console.log({ status: 'Error', err });
        })
}

const getDeliveryByID = async (req, res) => {
    const { _id } = req.body;

    Delivery.findById(_id)
        .then((Delivery) => {
            res.json(Delivery);
        })
        .catch((err) => {
            console.log({ status: 'Error', err });
        });
}

const updateDeliveryDriverId = async (req, res) => {
    const { _id, driverId  } = req.body;


    Delivery.findById(_id)
        .then((Delivery) => {
            if(!Delivery)
                res.json({ status: 'No Delivery' });
            else {
                Delivery.driverId = driverId;
                Delivery.lastModifiedDateTime = new Date();

                Delivery.save()
                .then((Delivery) => {
                    res.json(Delivery);
                })
                .catch((err) => {
                    console.log({ status: 'Error', err });
                });
            }
        })
        .catch((err) => {
            console.log({ status: 'Error', err });
        });
}

const updateDeliveryStatus = async (req, res) => {
    const { _id, status  } = req.body;


    Delivery.findById(_id)
        .then((Delivery) => {
            if(!Delivery)
                res.json({ status: 'No Delivery' });
            else {
                Delivery.status = status;
                Delivery.lastModifiedDateTime = new Date();

                Delivery.save()
                .then((Delivery) => {
                    res.json(Delivery);
                })
                .catch((err) => {
                    console.log({ status: 'Error', err });
                });
            }
        })
        .catch((err) => {
            console.log({ status: 'Error', err });
        });
}

const deleteDelivery = async (req, res) => {
    let objId = req.params.id;

    await Delivery.findByIdAndDelete(objId)
        .then(() => {
            res.json({ status: 'success' });
        })
        .catch((err) => {
            console.log({ status: 'Error', err });
        })
}




module.exports = {
    assignDelivery,
    getAllDelivery,
    getDeliveryByID,
    updateDeliveryDriverId,
    updateDeliveryStatus,
    deleteDelivery
}
