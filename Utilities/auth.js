const jwt = require('jsonwebtoken');
const secretKey = "fxN4c7A#4cyCUzk)f!I?)0@(0XC*9aZHb#k}@9}wAms#ZF&8=W;x$uRYeCW=E)<";

exports.sigIn = (data) => {
    return jwt.sign({data}, secretKey, {expiresIn: '1h'});
}

exports.verifyToken = (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if(!token){
            return res.status(401).json('Unauthorized');
        }
        const verified = jwt.verify(token, secretKey);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json(error.message);
    }
    
};
