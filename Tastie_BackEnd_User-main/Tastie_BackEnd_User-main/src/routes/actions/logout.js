const { url_logout } = require("../../constant/url");
const UserControllers = require("../../controllers/usercontrollers");




const logoutRoute = app => {
    app.post(url_logout,UserControllers.logout)
}



module.exports = logoutRoute;