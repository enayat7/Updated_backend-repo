import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
    username: { 
        type: String, 
        required: [true, 'username is required'],
        unique: true,
        lowercase:true,
        trim : true
    },
    fullname: { 
        type: String, 
        required: [true, 'Name is required'],
        unique: true,
        trim : true
    },
    email: { 
        type: String, 
        required: [true, 'email is required'],
        unique: true,
        lowercase:true,
        trim : true
    },
    password:{
        type: String,
        require:[true, 'Password is required']
    }
},{ timestamps: true })

export const User = mongoose.model("User", userSchema)
