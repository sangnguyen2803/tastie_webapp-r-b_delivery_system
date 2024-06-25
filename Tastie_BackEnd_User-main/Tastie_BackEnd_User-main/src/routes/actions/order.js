const { url_get_promotion, url_submit_order, url_submit_order_pickup, url_submit_order_items, url_get_order_detail, url_get_order_summary, url_get_order_history, url_get_shipper_info, url_update_order_status, url_clear_cart, url_get_promotion_money, url_get_promos_detail, url_add_order_review, url_add_shipper_review, url_add_notification, url_get_all_notification } = require("../../constant/url");
const OrderController = require("../../controllers/ordercontrollers");





const OrderRouter = app => {
    app.get(url_get_promotion, OrderController.getAllPromotion)


    app.post(url_submit_order, OrderController.submitOrder)
    app.post(url_submit_order_pickup, OrderController.submitOrderPickup)
    app.post(url_submit_order_items, OrderController.submitOrderItems)
    app.get(url_get_order_detail, OrderController.getOrderDetail)
    app.get(url_get_order_summary, OrderController.getOrderSummary)
    app.get(url_get_order_history, OrderController.getOrderHistory)
    app.get(url_get_shipper_info, OrderController.getShipperInfo)
    app.post(url_update_order_status, OrderController.updateOrderStatus)
    app.delete(url_clear_cart, OrderController.clearCart)

    app.post(url_get_promotion_money, OrderController.getPromsMoney)
    app.get(url_get_promos_detail, OrderController.getPromsDetail)

    app.post(url_add_order_review, OrderController.addOrderReview)
    app.post(url_add_shipper_review, OrderController.addShipperReview)


    app.post(url_add_notification, OrderController.addNotifi)

    app.get(url_get_all_notification, OrderController.getNotifi)
}



module.exports = OrderRouter;