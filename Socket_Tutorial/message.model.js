import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema({
    id:{
        type:String,
        
    },

    client_offset:{
        type:String,

    },

    content:{
        type:String,
        required:true
    }
});

const  MESSAGEMODEL = mongoose.model("MESSAGEMODEL", messageSchema);

export default MESSAGEMODEL;