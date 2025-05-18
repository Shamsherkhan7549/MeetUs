import { USERMODEL } from "../models/user.model.js";
import httpStatus from "http-status";
import bcrypt,{hash} from "bcrypt";
import crypto from "crypto";


//signup
export const register = async(req, res) => {
    const {name,username,password}  = req.body;

    try {
        const userExist = await USERMODEL.findOne({username});

        if(userExist){
           return res.status(httpStatus.FOUND).json({success:false, message:"username already register"})
        }

        const salt = await bcrypt.genSalt(10);

       const hashedPassword = await bcrypt.hash(password, salt);

       const newUser = new USERMODEL({
        name:name,
        username:username,
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
            res.status(4000).json({success:false, message:"Please Provide Both Info."});
        };

        const user = await USERMODEL.findOne({username});
        
        if(!user){
           return res.status(httpStatus.NOT_FOUND).json({success:false, message:"Username is wrong or not found."});
        };

          const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(httpStatus.NOT_FOUND).json({success:false, message:"Password is wrong."}) 
        }

          let token = crypto.randomBytes(20).toString("hex");
            user.token = token;
            await user.save();
            return res.status(httpStatus.OK).json({success:true, token:token})

    } catch (error) {
     return res.status(500).json({success:false, message:`SOMETHING WENT WRONG ${error}`})

    }
}

