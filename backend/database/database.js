import mongoose from 'mongoose';
import Exception from '../exceptions/Exception.js';
mongoose.set('strictQuery', true);

async function connect(){
    try{
        let connection = await mongoose.connect(process.env.MONGO_URI);
        console.log("Connect mongoose successfully");
        return connection;
    }catch(error){
        const {code} = error;
        debugger
        if(code == 8000){
            throw new Exception('Wrong db username and passwords');
        }else if(code == 'ENOTFOUND'){
            throw new Exception('Wrong username or passwords');
        }
        throw new Exception('cannot connect to Mongoose');
    }
}

export default connect;