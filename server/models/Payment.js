const mongoose = require ('mongoose')

const PaymentSchema = new mongoose.Schema({

    paymentType: {
        type: String,
        required: true
    },

    amount: {
        type:String,
        required: true
    },

    transactionDateTime:{
        type:String,
        required: true
    }

})


module.exports = mongoose.model('Payment', PaymentSchema)