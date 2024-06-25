const productRouter = require("./product/product");
const providerRoute = require("./provider/providerRoute");
const merchantRouter = require("./register/merchantRoute");





const indexRoute = (app) => {
    merchantRouter(app)
    productRouter(app)
    providerRoute(app)
}


module.exports = indexRoute;