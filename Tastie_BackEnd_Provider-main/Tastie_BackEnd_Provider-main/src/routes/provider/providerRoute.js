const { url_provider_get_near_by_provider, url_provider_get_near_by_provider_with_group, url_add_promotion, url_update_promotion, url_get_all_order, url_get_order_detail, url_register_ecoupon } = require("../../../const/url")
const MerchantController = require("../../controllers.js/merchantController")



const providerRoute = (app) => {

    app.post(url_provider_get_near_by_provider, MerchantController.getNearByProvider)
    app.post(url_provider_get_near_by_provider_with_group, MerchantController.getGroupProvider)
    app.post(url_add_promotion, MerchantController.AddPromotion)
    app.post(url_update_promotion, MerchantController.UpdatePromotion)
    app.post(url_get_all_order, MerchantController.getAllOrder)
    app.get(url_get_order_detail, MerchantController.getOrderDetail)
    app.post(url_register_ecoupon, MerchantController.registerEcoupon)



}

module.exports = providerRoute