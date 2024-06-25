const url_merchant_register = '/v1/api/provider/sign-contract';
const url_provider_update_form1 = '/v1/api/provider/register/:id/basic-info';
const url_provider_update_form2 = '/v1/api/provider/register/:id/representive'	
const url_get_categories = '/v1/api/provider/register/:type/get-categories'

const url_provider_update_form3 = '/v1/api/provider/register/:id/detail-info'
const url_provider_update_form4 = '/v1/api/provider/register/:id/menu-photo'
const url_provider_update_form5 = '/v1/api/provider/register/:id/bank-info'


const url_provider_product_add = '/v1/api/provider/dashboard/menu-overview/add-item'
const url_provider_product_remove = '/v1/api/provider/dashboard/menu-overview/:product_id/remove-item'
const url_provider_get_menu_items = '/v1/api/provider/dashboard/menu-overview/:id/get-menu-items'
const url_provider_product_update = '/v1/api/provider/dashboard/menu-overview/:id/update-product'
const url_provider_product_getlist = '/v1/api/provider/dashboard/menu-overview/:id/get-list-product'
const url_provider_add_menu_category = '/v1/api/provider/dashboard/menu-overview/:id/add-menu-category'
const url_provider_add_product_into_menu_category = '/v1/api/provider/dashboard/menu-overview/:id/add-product-into-menu-category'
const url_provider_get_info = '/v1/api/provider/dashboard/:provider_id/get-info'
const url_provider_product_update_status = '/v1/api/provider/dashboard/menu-overview/:provider_id/update-product-status'
const url_provider_update_provider = '/v1/api/provider/dashboard/:provider_id/update-provider'
const url_register_ecoupon = '/v1/api/provider/dashboard/register-ecoupon'

const url_provider_get_near_by_provider = '/v1/api/provider/dashboard/home/get-near-by-provider'
const url_provider_get_near_by_provider_with_group = '/v1/api/provider/dashboard/home/get-group-provider'

const url_add_promotion = '/v1/api/tastie/provider/add-promotion'
const url_update_promotion = '/v1/api/tastie/provider/update-promotion'

const url_get_all_order = '/v1/api/provider/order/get-all-order'
const url_get_order_detail = '/v1/api/provider/order/get-all-products-from-order/:order_code'

module.exports = {
    url_merchant_register,
    url_provider_update_form1,
    url_provider_update_form2,
    url_get_categories,
    url_provider_update_form3,
    url_provider_update_form4,
    url_provider_update_form5,
    url_provider_product_add,
    url_provider_get_menu_items,
    url_provider_product_update,
    url_provider_product_getlist,
    url_provider_product_remove,
    url_provider_add_menu_category,
    url_provider_add_product_into_menu_category,
    url_provider_get_info,
    url_provider_product_update_status,
    url_provider_update_provider,
    url_provider_get_near_by_provider,
    url_provider_get_near_by_provider_with_group,
    url_add_promotion,
    url_update_promotion,
    url_get_all_order,
    url_get_order_detail,
    url_register_ecoupon
}