const { url_get_cart_detail, url_delete_cart_detail, url_insert_cart_detail, url_update_quantity_and_note_cart_detail, url_update_value_of_label_cart_detail, url_update_label_of_product_cart_detail, url_delivery_fee_to_checkout } = require("../../constant/url");
const requestControllers = require("../../controllers/requestcontrollers");




const cartDetail = app => {
    app.get(url_get_cart_detail,requestControllers.getCartDetail)
    app.post(url_update_quantity_and_note_cart_detail,requestControllers.updateQuantityAndNoteIntoCartDetail)
    app.post(url_delete_cart_detail, requestControllers.deleteCartDetail)
    app.post(url_insert_cart_detail, requestControllers.insertCartDetail)
    app.post(url_update_value_of_label_cart_detail, requestControllers.updateValueOfLabel)
    app.post(url_update_label_of_product_cart_detail, requestControllers.updateLabelOfProduct)
    app.post(url_delivery_fee_to_checkout, requestControllers.DeliveryFeeToCheckOut)
}



module.exports = cartDetail;