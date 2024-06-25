const route = require('./account/login');
const registerRoute = require('./account/register');
const cartDetail = require('./actions/cart');
const CheckoutRouter = require('./actions/checkout');
const confirmOtp = require('./actions/confirm');
const getlistReview = require('./actions/getlistreview');
const logoutRoute = require('./actions/logout');
const OrderRouter = require('./actions/order');
const resestPasswordRoute = require('./actions/resetpassword');
const SearchRouter = require('./actions/search');
const updateRoute = require('./actions/update');



const routesUser = (app) => {

    route(app)
    confirmOtp(app)
    registerRoute(app)
    updateRoute(app)
    resestPasswordRoute(app)
    logoutRoute(app)
    getlistReview(app)
    cartDetail(app)
    SearchRouter(app)
    CheckoutRouter(app)
    OrderRouter(app)
}

module.exports = routesUser;