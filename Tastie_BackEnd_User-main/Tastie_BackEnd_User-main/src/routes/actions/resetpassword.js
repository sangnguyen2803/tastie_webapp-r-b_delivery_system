const { url_resestpw } = require("../../constant/url");
const UserControllers = require("../../controllers/usercontrollers");



const resestPasswordRoute = (app) => {

    app.post(url_resestpw, UserControllers.sendEmailWithSM);
}

module.exports = resestPasswordRoute;