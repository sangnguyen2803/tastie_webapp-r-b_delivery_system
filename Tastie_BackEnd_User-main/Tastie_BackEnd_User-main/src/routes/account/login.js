require("dotenv").config();


const {url_login, url_get_info, url_get_provider} = require('../../constant/url')
const verifySecurity = require('../../middleware/auth')


const UserControllers = require("../../controllers/usercontrollers");

function route(app){

    app.get(url_login, verifySecurity, (req, res) => {
        res.send("Hello login")
    })


    app.post(url_login, UserControllers.signIn);
    app.post('/v1/api/auth/login-with-otp', UserControllers.loginWithOtp)
    app.post(url_get_info, UserControllers.getInfo)
    app.post(url_get_provider, UserControllers.getProvider)

}


module.exports = route;