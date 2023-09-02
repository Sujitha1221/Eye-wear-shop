import mongoose from "mongoose";
const Schema = mongoose.Schema;

const AdminSchema = new Schema({

    firstname:{
        type:String,
        required: true,
        
    },
    lastname:{
        type:String,
        required: true,
        
    },
    email:{
        type:String,
        required: true,
        unique:true,
    },

    password:{
        type:String,
        required: true,
            
    },
    nic:{
        type:String,
        required:true,
        unique:true,

    },
      
    address:{
        type:String,
        required: true,
        
    },
    phone:{
        type:String,
        required: true,
        
    },
    
    image:{
        type:String,
        
    } 

});

const Admin = mongoose.model("Admin", AdminSchema);

export default Admin;

