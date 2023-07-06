import mongoose, {Schema, ObjectId} from "mongoose";
import isEmail from "validator/lib/isEmail.js";

export default mongoose.model('User', 
    new Schema({
        id: { type: ObjectId},
        name: { 
            type: String,
            required: true,
            validate:{
                validator: (value)=> value.length > 4 &&  value.length < 24,
                message: "Username must be at more than 4 characters and less than 24 characters"
            }
        },
        email:{
            type: String,
            validate:{
                validator: (value) => isEmail(value),
                message: "Email is not a valid"
            }
        },
        password:{
            type: String,
            required: true,
        },
        phoneNumber:{
            type: String,
            required: true,
        },
        address:{
            type: String,
            required: true,
        },
        role:{
            type: Number,
            default: 0,
        },
    })
)