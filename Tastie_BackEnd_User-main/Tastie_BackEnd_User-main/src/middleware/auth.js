const jwt = require('jsonwebtoken')

const verifySecurity = (req, res, next) => {
    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.split(' ')[1]


    if(!token){
        res.sendStatus(401)
    }
    else{
        try {
            const decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
            
            next()
        } catch (error) {
            res.sendStatus(403)
        }
        

    }
}


module.exports = verifySecurity