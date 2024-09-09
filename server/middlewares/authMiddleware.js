import jwt from 'jsonwebtoken'
export const jwtAuthMiddleware =  (req,res,next) => {
    const authorization = req.headers.authorization ;
    if(!authorization){
        return res.status(401).json({'error':'token not found!'})
    }
    const token = authorization.split(' ')[1];
    if(!token) {
        return res.status(401).json({'error':'unauthorised'})
    }
    try {
        const userData = jwt.verify(token , process.env.JWT_SECRET )
        req.userId = userData.userId
        next();
    }
    catch(err){
        return res.status(401).json(err)
    }
};
export const generateToken = (userData) => {
    return jwt.sign(userData,process.env.JWT_SECRET,{
        expiresIn: 30*24*60*60
    })
};