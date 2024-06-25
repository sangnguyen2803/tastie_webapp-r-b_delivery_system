const { url_otp, url_resestpw, url_check_exist_email_and_phone, url_send_code_to_verify_with_email, url_verify_code_with_email } = require("../../constant/url");
const requestControllers = require("../../controllers/requestcontrollers");
const UserControllers = require("../../controllers/usercontrollers");


const confirmOtp = (app) => {

    app.post(url_otp, UserControllers.sendOtpSmS);
    app.post(url_resestpw, UserControllers.sendEmailWithSM);
    app.post(url_check_exist_email_and_phone, requestControllers.checkExistEmailAndPhone)
    app.post(url_send_code_to_verify_with_email, requestControllers.sendCodeToVerifyEmail)
    app.post(url_verify_code_with_email, requestControllers.verifyEmail)
}

module.exports = confirmOtp;