const { url_signup } = require("../../constant/url")
const UserControllers = require("../../controllers/usercontrollers");




const registerRoute = app => {
    app.post(url_signup,UserControllers.signUp)
}



module.exports = registerRoute;