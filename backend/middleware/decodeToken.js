const jwt = require('jsonwebtoken');
const JWT_SECRET = "hinidhikeepworkinghard";


const decodeToken = (req,res,next)=>{
const token = req.header('auth-token');
// console.log(token);
if(!token){
    res.status(401).json({error:"please provide authenticate token to get acess"})
}
try {
    const decode = jwt.verify(token,JWT_SECRET)
    // console.log(decode);
req.user = decode;
next();
} catch (error) {
    res.status(401).json({error:"please provide authenticate token to get acess"})
    
}
}
module.exports = decodeToken;
