import { body, validationResult } from 'express-validator';
import {usersRepository} from'../repositories/index.js';
import Exception from '../exceptions/Exception.js';
import {EventEmitter} from 'node:events';

const myEvent = new EventEmitter();
myEvent.on('event.register.user', (params) => {
    console.log(`they talk about parameter: ${JSON.stringify(params)}`);
});

const login = async (req, res) => {
    // email,phone, ...
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {email, password} = req.body;
        //call repositories
        try{
            let existingUser = await usersRepository.login({email, password});
            res.status(200).json({
                message: 'Login successfully',
                data: existingUser
            });
        }catch(exception){
            res.status(500).json({
                message: exception.toString(),
            });
        }
}

const register = async (req, res) => {
    const {email, password, name, phoneNumber, address} = req.body;
    debugger
    //event emmitters
    //khi co mot su kien nao do xay ra ma muon cac ham khac thay thi su dung cai nay
    // myEvent.emit('event.register.user', {x: 1, y: 2});
    try{
        const user = await usersRepository.register({email, password, name, phoneNumber, address});
        
        res.status(201).json({
            message: 'Welcome to post register',
            data: user
        });
    }catch(exception){
        debugger
        res.status(500).json({
            message: exception.toString(),
        });
    }

}

const getDetailUser = async (req, res) => {
    res.send('Welcome to post register');
}

export default {login, register, getDetailUser}