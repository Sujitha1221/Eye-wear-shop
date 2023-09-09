import Admin from "../models/Admin.mjs"
import DeliveryDriver from "../models/DeliveryDriver.mjs"
import logger from "../utils/logger.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const LoginController = {
Login:async (req,res) => {
    const{email,password} = req.body;

    try{
        const admin = await Admin.findOne({email:email})
        const driver = await DeliveryDriver.findOne({email:email})

        if(admin){
            bcrypt.compare(password,admin.password,(err,response) => {
                if(response){
                    res.json({type:"admin",admin})

                }
            else{
                res.json("Invalid Password")

            }})
         
                
        }else if(driver){
            
            bcrypt.compare(password,driver.password,(err,response) => {
                if(response){
                    res.json({type:"driver",driver})

                }
            else{
                res.json("Invalid Password")

            }})

                
        }else{
            res.json("Not exist")
        }
    }catch(e){
        res.json("No")
    }

}

};


export default LoginController;