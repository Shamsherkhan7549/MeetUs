import { USERMODEL } from "../models/user.model.js";
import httpStatus from "http-status";
import bcrypt from 'bcrypt'
import crypto from "crypto";


//signup
export const register = async(req, res) => {
    const {username,email,password}  = req.body;

    try {
        const userExist = await USERMODEL.findOne({$or:[{username:username}, {email:email}]});

        if(userExist){
           return res.status(httpStatus.FOUND).json({success:false, message:"username or email already register"})
        }

        const salt = await bcrypt.genSalt(10);
        
       const hashedPassword = await bcrypt.hash(password, salt);

       const newUser = new USERMODEL({
        username:username,
        email:email,
        password:hashedPassword
       });

       await newUser.save()
        
       return res.status(httpStatus.CREATED).json({success:true, message:"user registered successfully"})

       
    } catch (error) {
        return res.json({success:false, message:`SOMETHING WENT WRONG ${error}`})
        
    }
};

    // login
export const login = async(req, res) => {
    const {username, password} = req.body;

    try {
        if(!username || !password){
            res.status(400).json({success:false, message:"Please Provide username and  password."});
        };

        const user = await USERMODEL.findOne({username});
        
        if(!user){
           return res.status(httpStatus.NOT_FOUND).json({success:false, message:"Username is wrong or not found."});
        };

          const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(httpStatus.UNAUTHORIZED).json({success:false, message:"Password is wrong."}) 
        }

          let token = crypto.randomBytes(20).toString("hex");
            user.token = token;
            await user.save();
            return res.status(httpStatus.OK).json({success:true, token:token, message:"Welcome Back"})

    } catch (error) {
     return res.status(500).json({success:false, message:`SOMETHING WENT WRONG ${error}`})

    }
}

