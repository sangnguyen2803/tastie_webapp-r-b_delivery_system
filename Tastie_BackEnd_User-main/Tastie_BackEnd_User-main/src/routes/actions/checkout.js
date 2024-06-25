const {url_get_customer_address, url_get_schedule, url_update_paymen_status, url_add_customer_address, url_update_customer_address, url_payment_by_momo, url_payment_by_zalo } = require("../../constant/url");
const OrderController = require("../../controllers/ordercontrollers");
const PaymentControllers = require("../../controllers/paymentcontrollers");
const requestControllers = require("../../controllers/requestcontrollers");
const UserControllers = require("../../controllers/usercontrollers");




const CheckoutRouter = app => {
    app.get(url_get_customer_address,requestControllers.getCustomerAdress)
    app.get(url_get_schedule,requestControllers.getScheduleOperation)
    app.post(url_update_paymen_status, OrderController.updatePaymentStatus)
    app.post(url_add_customer_address, UserControllers.addCustomerAddress)
    app.post(url_update_customer_address, UserControllers.updateCustomerAddress)

    //
    app.post(url_payment_by_momo, PaymentControllers.paymentWithMomo)
    app.post(url_payment_by_zalo, PaymentControllers.paymentWithZalo)
}



module.exports = CheckoutRouter;