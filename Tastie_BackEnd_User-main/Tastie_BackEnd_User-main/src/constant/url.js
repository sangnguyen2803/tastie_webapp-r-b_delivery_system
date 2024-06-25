const url_login = '/v1/api/auth/sign-in';
const url_signup = '/v1/api/auth/sign-up';
const url_otp = '/v1/api/auth/otp';
const url_resestpw = '/v1/auth/resest-password';
const url_update = '/v1/api/auth/update';
const url_get_access_token = '/v1/api/auth/get-access-token';
const url_check_exist_email_and_phone = '/v1/api/auth/check-exist-email-and-phone';
const url_send_code_to_verify_with_email = '/v1/api/auth/send-code-with-email';
const url_verify_code_with_email = '/v1/api/auth/verify-code-with-email';
const url_get_info = '/v1/api/auth/get_profile'
const url_get_provider = '/v1/api/auth/get_provider'
const url_change_password = '/v1/api/auth/change-password'
const url_logout = '/v1/api/auth/logout'
const url_get_list_review = '/v1/api/tastie/store/customer_review/:provider_id'


const url_get_cart_detail = '/v1/api/tastie/tastie/get_cart/:user_id'
const url_insert_cart_detail = '/v1/api/tastie/tastie/insert_product-into-cart'
const url_update_quantity_and_note_cart_detail = '/v1/api/tastie/tastie/update-quantity-and-note-into-cart'
const url_update_value_of_label_cart_detail = '/v1/api/tastie/tastie/update-value-of-label-into-cart'
const url_update_label_of_product_cart_detail = '/v1/api/tastie/tastie/update-label-of-product-into-cart'
const url_delete_cart_detail = '/v1/api/tastie/tastie/delete_cart'
const url_delivery_fee_to_checkout = '/v1/api/tastie/tastie/delivery-fee-to-checkout'
const url_get_customer_address = '/v1/api/tastie/checkout/get_contact/:user_id'
const url_get_schedule = '/v1/api/tastie/checkout/get_schedule_time/:provider_id'

const url_search = '/v1/api/tastie/search'


const url_get_promotion = '/v1/api/tastie/checkout/get-all-promos/:provider_id'

const url_get_all_category = '/v1/api/tastie/home/get-all-category'

const url_clear_cart = '/v1/api/tastie/tastie/clear-cart/:customer_id'



// Order

const url_submit_order = '/v1/api/tastie/order/submit-order-info-delivery'
const url_submit_order_pickup = '/v1/api/tastie/order/submit-order-info-pickup'
const url_submit_order_items = '/v1/api/tastie/order/submit-order-items'
const url_get_order_summary = '/v1/api/tastie/order/get-order-summary/:order_code'
const url_get_order_history = '/v1/api/tastie/order/get-order-history/:customer_id'
const url_get_shipper_info = '/v1/api/tastie/order/get-shipper-info/:shipper_id'
const url_update_order_status = '/v1/api/tastie/order/update_order_status'
const url_get_order_detail = '/v1/api/tastie/order/get-all-products-from-order/:order_code'
const url_get_promotion_money = '/v1/api/tastie/order/get-promos-money'
const url_get_promos_detail = '/v1/api/tastie/order/get-promos-detail/:promos_code'

const url_add_order_review = '/v1/api/tastie/order/add-order-review'
const url_add_shipper_review = '/v1/api/tastie/order/add-shipper-review'

const url_add_notification = '/v1/api/tastie/order/add-notification'
const url_get_all_notification = '/v1/api/tastie/order/get-all-notification/:user_id'

const url_add_customer_address = '/v1/api/tastie/add-customer-address'
const url_update_customer_address = '/v1/api/tastie/update-customer-address'
const url_update_paymen_status = '/v1/api/tastie/order/update-payment-status'

const url_payment_by_momo = '/v1/api/tastie/order/payment-by-momo'
const url_payment_by_zalo = '/v1/api/tastie/order/payment-by-zalo'

module.exports = {
    url_login,
    url_otp,
    url_resestpw,
    url_signup,
    url_update,
    url_get_access_token,
    url_check_exist_email_and_phone,
    url_send_code_to_verify_with_email,
    url_verify_code_with_email,
    url_get_info,
    url_change_password,
    url_logout,
    url_get_provider,
    url_get_list_review,
    url_get_cart_detail,
    url_update_quantity_and_note_cart_detail,
    url_delete_cart_detail,
    url_insert_cart_detail,
    url_update_value_of_label_cart_detail,
    url_update_label_of_product_cart_detail,
    url_delivery_fee_to_checkout,
    url_search,
    url_get_customer_address,
    url_get_schedule,
    url_get_promotion,
    url_get_all_category,
    url_submit_order,
    url_submit_order_pickup,
    url_submit_order_items,
    url_get_order_summary,
    url_get_order_history,
    url_get_shipper_info,
    url_update_order_status,
    url_get_order_detail,
    url_clear_cart,
    url_get_promotion_money,
    url_get_promos_detail,
    url_add_order_review,
    url_add_shipper_review,
    url_add_customer_address,
    url_update_customer_address,
    url_update_paymen_status,
    url_payment_by_momo,
    url_payment_by_zalo,
    url_add_notification,
    url_get_all_notification
};