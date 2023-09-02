const mongoose = require ('mongoose')

const PaymentSchema = new mongoose.Schema({

    products: [{
        name: String,
        price: Number,
        quantity: Number
    }],

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