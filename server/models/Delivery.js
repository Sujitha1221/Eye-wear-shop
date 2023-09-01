const mongoose = require ('mongoose')

const DeliverySchema = new mongoose.Schema({

    paymentId: {
        type: String,
        required: true
    },

    driverId: {
        type: String,
        required: true
    },

    address:{
        type:String,
        required: true
    },

    phoneNumber: {
        type:String,
        required: true
    },

    status: {
        type:String,
        required: true
    },

    lastModifiedDateTime: {
        type: String,
        required: true
    }

})


module.exports = mongoose.model('Delivery', DeliverySchema)