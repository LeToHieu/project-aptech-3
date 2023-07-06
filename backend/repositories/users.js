
import bcrypt from "bcrypt"; 
import Exception from "../exceptions/Exception.js";
import {User} from "../models/index.js"
import jwt from "jsonwebtoken";

const login = async ({email, password}) => {
    let exitedUser = await User.findOne({email}).exec();
    if(exitedUser){
        //not encrypted password
        let isMatch = await bcrypt.compare(password, exitedUser.password);
        debugger
        if(isMatch == true){
            //create javascript web token
            let token = jwt.sign(
                {data: exitedUser}, 
                process.env.JWT_SECRET, 
                {
                    expiresIn: '10 days'
                    //expiresIn: '60'
                }
            )
            return {...exitedUser.toObject(), password: 'not shown', token}
        }else{
            throw new Exception("Wrong username or password");
        }
    }else{
        throw new Exception("User not exited");
    }

}

const register  = async ({
    phoneNumber,
    email, 
    password,
    name,
    address
}) => {
    let exitedUser = await User.findOne({email}).exec();
    if(!!exitedUser){//if(exitedUser !== null)
        throw new Exception("Exited user")
    }  
    
    const harshedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUND));

    //insert User
    const newUser = await User.create({
        phoneNumber,
        email, 
        password: harshedPassword,
        name,
        address
    });
    debugger
    return {...newUser._doc, password: 'not shown'}

    //console.log('register with param name:'  + name + " email: " + email + " address: " + address + " password: " + password + " phoneNumber: " + phoneNumber);
}

export default {login, register}