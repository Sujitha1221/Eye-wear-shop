const DeliveryDriver = require('../models/DeliveryDriver');

const registerDeliveryDriver = async (req, res) => {
    const { firstName, lastName, email, address, NIC, licenseNo, vehicleNo, password } = req.body;

    DeliveryDriver.create({ firstName, lastName, email, address, NIC, licenseNo, vehicleNo, password, numberOfOrder: 0, lastModifiedDateTime: new Date() })
        .then((DeliveryDriver) => {
            console.log({ status: 'Success', DeliveryDriver });
            res.json(DeliveryDriver);
            //console.log({status: 'Success'});
        })
        .catch((err) => {
            console.log({ status: 'Error', err });
        })
}

const getDeliveryDriverByEmail = async (req, res) => {
    const { email } = req.body;

    DeliveryDriver.findOne({ email: email })
        .then((DeliveryDriver) => {
            if (!DeliveryDriver) {
                console.log({ status: "No user" });
                res.json(DeliveryDriver);
            }
            else {
                res.json(DeliveryDriver);
            }
        })
        .catch((err) => {
            console.log({ status: 'Error', err });
        })
}


const getAllDeliveryDrivers = async (req, res) => {
    DeliveryDriver.find()
        .then((DeliveryDriver) => {
            res.json(DeliveryDriver);
        })
        .catch((err) => {
            console.log({ status: 'Error', err });
        })
}

const getDeliveryDriverByID = async (req, res) => {
    const { _id } = req.body;

    DeliveryDriver.findById(_id)
        .then((DeliveryDriver) => {
            res.json(DeliveryDriver);
        })
        .catch((err) => {
            console.log({ status: 'Error', err });
        });
}

const updateDeliveryDriver = async (req, res) => {
    const { _id, firstName, lastName, email, address, NIC, licenseNo, vehicleNo, password  } = req.body;


    DeliveryDriver.findById(_id)
        .then((DeliveryDriver) => {
            if(!DeliveryDriver)
                res.json({ status: 'No user' });
            else {
                DeliveryDriver.firstName = firstName;
                DeliveryDriver.lastName = lastName;
                DeliveryDriver.email = email;
                DeliveryDriver.NIC = NIC;
                DeliveryDriver.address = address;
                DeliveryDriver.licenseNo = licenseNo;
                DeliveryDriver.vehicleNo = vehicleNo;
                DeliveryDriver.password = password;
                DeliveryDriver.lastModifiedDateTime = new Date();

                DeliveryDriver.save()
                .then((DeliveryDriver) => {
                    res.json(DeliveryDriver);
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

const deleteDeliveryDriver = async (req, res) => {
    let objId = req.params.id;

    await DeliveryDriver.findByIdAndDelete(objId)
        .then(() => {
            res.json({ status: 'success' });
        })
        .catch((err) => {
            console.log({ status: 'Error', err });
        })
}

const getMinNumberOfOrder = async (req, res) => {
    const minOrder = 0;
    const driverId = "";

    DeliveryDriver.find()
        .then((DeliveryDriver) => {
            console.log(DeliveryDriver);

            const order = DeliveryDriver.map(DeliveryDriver => DeliveryDriver.numberOfOrder);

            console.log(order);
            //res.json(DeliveryDriver);
        })
        .catch((err) => {
            console.log({ status: 'Error', err });
        })
}




module.exports = {
    registerDeliveryDriver,
    getDeliveryDriverByEmail,
    getAllDeliveryDrivers,
    getDeliveryDriverByID,
    updateDeliveryDriver,
    deleteDeliveryDriver,
    getMinNumberOfOrder
}
