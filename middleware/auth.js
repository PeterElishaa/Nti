const jwt = require('jsonwebtoken');
const secret_key = "^U%+6X|iZD2wk*$[Bsr:5IFy[FMC.9T]l-F.GTG;rOdZ]$=0o?lO:F&I9;U/sJh";

exports.sigIn = (data)=>{
    return token = jwt.sign(data,secret_key,{expiresIn:'1h'})
}

exports.authMiddleware = (req,res,next)=>{
    try{
    const token = req.header('Authorization')?.replace('Bearer ','');
    if(!token){
        return res.status(401).send('error access denied')
    }
    const verified = jwt.verify(token,secret_key);
    req.user = verified;
    next();
    }
    catch(err){
        res.status(500).send(err.message)
    }
}