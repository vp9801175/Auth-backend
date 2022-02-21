const jwt = require('jsonwebtoken')

const verifyToken = (req,res,next) => {
    try {
        var token = req.headers.authorization

        if(!token){
            return res.status(400).send({status: 400,message: 'Please provide authorization token'})
        }

        const payload = jwt.decode(token);
        req.user = payload

        const currentTime = new Date().getTime();
        const expiryTime = payload ? payload.exp * 1000 : 'null';

        if(expiryTime && expiryTime <= currentTime){
            return res.status(400).send({status: 400, message: 'Token Expired'})
        }

        const isValidToken = jwt.verify(token, process.env.TOKEN_KEY)
        
        next()
    } catch (error) {
        console.log(error)
        return res.status(401).send({status: 401,message: "Invalid Token"});
    }
}

module.exports = verifyToken