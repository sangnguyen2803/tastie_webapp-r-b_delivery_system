const { url_update, url_get_access_token, url_change_password } = require("../../constant/url");
const getAccessToken = require("../../controllers/acesstokencontrollers");
const UserControllers = require("../../controllers/usercontrollers");



const updateRoute = (app) => {

    app.post(url_update, UserControllers.updateAccount);
    app.post(url_get_access_token, getAccessToken);
    app.post(url_change_password, UserControllers.changePassword)
 
}

module.exports = updateRoute;