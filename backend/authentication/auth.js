import jwt from "jsonwebtoken";
export default function checkToken(req, res, next) {
    //specific routers
    if(req.url.toLowerCase().trim() == '/users/login'.toLowerCase().trim() || 
        req.url.toLowerCase().trim() == '/users/register'.toLowerCase().trim()){
        next();
        return
    }

    //other routers
    const token = req.headers?.authorization?.split(" ")[1]
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded)=>{
        if(error){
            return res.status(500).json({message: 'failed to verify token: '+ error.message});
        }
        req.user = decoded;
        debugger;
        next();
    });

    return

}