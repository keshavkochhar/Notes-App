var jwt = require('jsonwebtoken');
const JWT_SECRET = 'Harryisagoodb$oy';
const fetchuser = (req, res, next) =>{
// get user from jwt token and id to req body
const token = req.header('auth-token');
if(!token){
    res.status(401).send({error:"please authenticate using correct token"})
}
try{
const data =jwt.verify(token, JWT_SECRET);
req.user =data.user;
next();
}
catch (error) {
    res.status(401).send({error:"please authenticate using correct token"})
}
}
module.exports = fetchuser;