import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        required:true,
    },

    token:{
        type:String
    }
});

export const USERMODEL = mongoose.model("USERMODEL", userSchema);

