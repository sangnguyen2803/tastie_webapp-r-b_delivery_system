const { url_merchant_register, url_provider_update_form1, url_provider_update_form2, url_provider_update_form3, url_provider_update_form4, url_provider_update_form5, url_get_categories, url_provider_get_info, url_provider_update_provider } = require("../../../const/url")
const MerchantController = require("../../controllers.js/merchantController")





const merchantRouter = (app) => {

    app.post(url_merchant_register, MerchantController.providerUpdateForm0)
    app.post(url_provider_update_form1, MerchantController.providerUpdateForm1)
    app.post(url_provider_update_form2, MerchantController.providerUpdateForm2)
    app.get(url_get_categories, MerchantController.getCategories)
    app.post(url_provider_update_form3, MerchantController.providerUpdateForm3)
    app.post(url_provider_update_form4, MerchantController.providerUpdateForm4)
    app.post(url_provider_update_form5, MerchantController.providerUpdateForm5)
    app.get(url_provider_get_info, MerchantController.getProviderInfo)
    app.post(url_provider_update_provider, MerchantController.updateProvider)
  
}

module.exports = merchantRouter