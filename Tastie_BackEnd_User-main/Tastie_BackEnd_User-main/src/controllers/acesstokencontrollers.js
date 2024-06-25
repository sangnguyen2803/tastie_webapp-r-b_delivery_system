const UserAction = require("../models/UserAction")






const getAccessToken = async (req, res) => {
    try {
        const token = req.body.token
        var result = await UserAction.getAccessToken(req.body)
        console.log(result)
        if(result !== null){
            res.status(200).json({
                accessToken : result,
                isAuth : true
            })
        }
        else{
            res.status(403).json({
                message : "get access token failed",
                isAuth : false
            })
        }
        
    } catch (error) {
        res.status(403).json({
            message : "get access token failed",
            isAuth : false
        })
    }
}


module.exports = getAccessToken