require("dotenv").config();



const sendgridMail = require('@sendgrid/mail');

sendgridMail.setApiKey(process.env.API_KEY_MAIL)



const host = require('../../config/connectMySql')

const moment = require('moment');

const UserAction = require("./useraction");



class OrderModel{
    static async getAllPromotions(provider_id){

        try {
           
            var response =  {
                ecoupon : [
    
                ],
                promotion : [
    
                ]
            }

            let sqlSelectEcoupon = `CALL Get_All_Ecoupon(${provider_id});`
            let sqlSelectPromotions = `CALL Get_All_Promos(${provider_id});`

            const list_promotion = await host.execute(sqlSelectPromotions)

            const _list_promotion = list_promotion[0][0]
            const list_ecoupon = await host.execute(sqlSelectEcoupon)
            const _list_ecoupon = list_ecoupon[0][0]
            _list_promotion.forEach(element => {
                let newPromotion = {
                    id : element["promotion_id"],
                    name : element["promotion_name"],
                    description : element["description"],
                    code : element["promotion_code"],
                    value : element["promotion_value"],
                    maximum_discount_value : element["maximum_discount_value"],
                    min_order_value : element["min_order_value"],
                    start_at : new Date(element["start_at"]).toLocaleString("vi-VI"), 
                    expire_at : new Date(element["expire_at"]).toLocaleString("vi-VI"),
                    status : element["promotion_status"]

                }
                response.promotion.push(newPromotion)
            });

            _list_ecoupon.forEach(element => {
                let newEcoupon = {
                    id : element["ecoupon_id"],
                    name : element["ecoupon_name"],
                    description : element["ecoupon_description"],
                    code : element["ecoupon_code"],
                    value : element["ecoupon_value"],
                    max_discount_value : element["max_discount_value"],
                    min_order_value : element["min_order_value"],
                    update_at : new Date(element["update_at"]).toLocaleString("vi-VI") ,
                    start_date :  new Date(element["start_date"]).toLocaleString("vi-VI"),
                    expire_date : new Date(element["expire_date"]).toLocaleString("vi-VI") 
                }
                response.ecoupon.push(newEcoupon)
            })

            
            // if(sub_total >= 0)
            // {
            //     response.ecoupon = response.ecoupon.filter(ecp => {
            //         return ecp.min_order_value <= sub_total
            //     })
            //     response.promotion = response.promotion.filter(prom => {
            //         return prom.min_order_value <= sub_total
            //     })
            // }

            return response

        } catch (error) {
            console.log(error)
            return null
            
        }
       
    }



    static async getOrderDetail(order_code){
        try {
            let sqlOrderDetail = `CALL Get_All_Products_From_Order ('${order_code}')`
            const [result, _] = await host.execute(sqlOrderDetail)
            const listOrderDetail = result[0]
           
            var response = {
                merchant_name: listOrderDetail[0]['merchant_name'] ? listOrderDetail[0]['merchant_name'] : null,
                items : [
                ],
                num_items : 0,
                delivery_fee : listOrderDetail[0]['delivery_fee'] ? listOrderDetail[0]['delivery_fee'] : 0

            }
            for(var i = 0; i < listOrderDetail.length; i++)
            {
                let objectOrder = listOrderDetail[i]
                let index_product = response.items.findIndex(product => {
                    return product['product_id'] === objectOrder['product_id']
                })
              
                console.log(index_product)
                if(index_product < 0){
                    let newProduct = {
                        product_id : objectOrder['product_id'],
                        product_name: objectOrder['product_name'],
                        price: objectOrder['price'],
                        image: objectOrder['product_image'],
                        quantity: objectOrder['quantity'],
                        special_instruction: objectOrder['special_instruction'],
                        product_options: [
                            {
                                label: objectOrder['label'],
                                value: objectOrder['value'],

                            }
                        ]
                    }

                    response.items.push(newProduct)

                }
                else{
                    let index_option = response.items[index_product].product_options.findIndex(op => {
                        return op['label'] === objectOrder['label']
                    })
                    if(index_option < 0){
                        let newOption = {
                            label: objectOrder['label'],
                            value: objectOrder['value'],

                        }

                        response.items[index_product].product_options.push(newOption)
                    }
                }
            }


            response.num_items = response.items.length

            return response

        } catch (error) {
            console.log(error)
            return null
        }
    }

    static async submitOrder(data){
        try {
            const {delivery_mode, customer_id, delivery_address,	
                customer_phone, payment_method, payment_status, promotion_code,
                ecoupon_code, delivery_method, schedule_time, tips, delivery_fee, subtotal, total} = data
            
            var order_code = UserAction.generateUUID()

            let sqlSubmitOrder = `CALL Submit_Basic_Info_Order_Delivery(${delivery_mode}, '${order_code}', ${customer_id}, '${delivery_address}', 
            '${customer_phone}', ${payment_method}, ${payment_status}, '${promotion_code}', '${ecoupon_code}',
            ${delivery_method}, '${schedule_time}', ${tips}, ${delivery_fee}, ${subtotal}, ${total});`

            await host.execute(sqlSubmitOrder)

            return order_code
        } catch (error) {
            console.log(error)
            return ""
        }
    }


    static async submitOrderPickup(data){
        try {
            const {delivery_mode, customer_id, payment_method, payment_status, promotion_code,
                ecoupon_code, delivery_method, schedule_time, subtotal, total} = data

            var order_code = UserAction.generateUUID()
            let sqlSubmitOrderPickup = `CALL Submit_Basic_Info_Order_Pickup(${delivery_mode}, '${order_code}', ${customer_id},  
                ${payment_method}, ${payment_status}, '${promotion_code}', '${ecoupon_code}',
                ${delivery_method}, '${schedule_time}', ${subtotal}, ${total});`
    
            await host.execute(sqlSubmitOrderPickup)
            


            return order_code
        } catch (error) {
            console.log(error)
            return ""
        }
    }

    static async clearCart(customer_id){
        try {
            let sqlDeleteCart = `CALL Delete_Items_From_CartDetail(${customer_id});`
            await host.execute(sqlDeleteCart)
         

            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }
    

    static async submitOrderItems(data){
        try {
            const {customer_id, order_code} = data
            
            let sqlSubmitOrderItems = `CALL Submit_Order_Delivery_Items(${customer_id}, '${order_code}');`
            let sqlDeleteCart = `CALL Delete_Items_From_CartDetail(${customer_id});`
        
            await host.execute(sqlSubmitOrderItems)
           
            UserAction.sleepFor(1000)
            await host.execute(sqlDeleteCart)
         

            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    // #1: Submitted, 2: Assigned, 3: Confirmed, 4: Picked, 5: Completed, 6: Canceled


    static getOrderStatus(status_id){
        var status_name = null
        switch (status_id) {
            case 1:
                status_name = 'Submitted'
                break;
            case 2:
                status_name = 'Assigned'
                break;
            case 3:
                status_name = 'Confirmed'
                break;
            case 4:
                status_name = 'Picked'
                break;
            case 5:
                status_name = 'Completed'
                break;
            case 6:
                status_name = 'Canceled'
                break;
            default:
                break;
        }

        return status_name
    }


    static utcformat(d){
        d= new Date(d);
        var tail= 'GMT', D= [d.getUTCFullYear(), d.getUTCMonth()+1, d.getUTCDate()],
        T= [d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds()];
        if(+T[0]> 12){
            T[0]-= 12;
            tail= ' pm '+tail;
        }
        else tail= ' am '+tail;
        var i= 3;
        while(i){
            --i;
            if(D[i]<10) D[i]= '0'+D[i];
            if(T[i]<10) T[i]= '0'+T[i];
        }
        return D.join('/')+' '+T.join(':')+ tail;
    }

    static async getOrderSummary(order_code){
        try {
            let sqlGetOrderSummary = `CALL Get_Order_Summary('${order_code}');`

            const [list_order_summary] = await host.execute(sqlGetOrderSummary)
            const _list_order_summary = list_order_summary[0]
           


            var response = {
                order_id: _list_order_summary[0]['order_id'],
                order_code: _list_order_summary[0]['order_code'],
                customer_phone: _list_order_summary[0]['customer_phone'],
                customer_address: _list_order_summary[0]['customer_address'],
                payment_method: _list_order_summary[0]['payment_method'],
                subtotal: _list_order_summary[0]['subtotal'],
                delivery_fee: _list_order_summary[0]['delivery_fee'],
                tip: _list_order_summary[0]['tip'],
                promotion_id: _list_order_summary[0]['promotion_id'],
                ecoupon_id: _list_order_summary[0]['ecoupon_id'],
                order_status: [
                ]
            }

            _list_order_summary.forEach(element => {

                

                let order_status = {
                    
                    update_at: new Date(element['update_at']).toLocaleString('vi-VI') ,
                    order_status_name: this.getOrderStatus(element['order_status_name']) 
                }
                response.order_status.push(order_status)
            })
            

            return response

        } catch (error) {
            console.log(error)
            return null
        }
    }


    static async getOrderHistory(customer_id){
        try {
            let sqlGetOrderHistory = `CALL Get_Order_History_By_Customer(${customer_id});`
            const [order_history, _] = await host.execute(sqlGetOrderHistory)
            const _list_order_history = order_history[0]

            var respone = []
           
            _list_order_history.forEach(or_history => {
                var index_order = respone.findIndex(_order => {
                    return (_order.order_id === or_history['order_id'])
                })
                
                if(index_order >= 0)
                {
                    if(respone[index_order]['order_status_nb'] < or_history['order_status_name'])
                    {
                        respone[index_order]['order_status_nb'] = or_history['order_status_name']
                        respone[index_order]['completed_at'] = new Date (or_history['update_at']).toLocaleString('vi-VI')
                        respone[index_order]['order_status'] = this.getOrderStatus(or_history['order_status_name'])
                    }
                    
                }
                else{
                    
                    let newOrderHistory = {
                        order_id: or_history['order_id'],
                        order_code: or_history['order_code'],
                        provider_name: or_history['merchant_name'],
                        provider_address: or_history['address'],
                        provider_avatar: or_history['avatar'],
                        order_status: this.getOrderStatus(or_history['order_status_name']),
                        order_status_nb : or_history['order_status_name'],
                        completed_at: new Date (or_history['update_at']).toLocaleString('vi-VI'),
                        payment_method: or_history['payment_name'],
                        total_amount: or_history['total_amount']
                    }
                    respone.push(newOrderHistory)
                }
                
            })

            return respone

        } catch (error) {
            console.log(error)
            return null
        }
    }


    static async getShipperInfo(shipper_id){
        try {
            let sqlGetShipperInfo = `CALL Get_Shipper_Info(${shipper_id});`
            const [info, _] = await host.execute(sqlGetShipperInfo)

            return info[0]
            
        } catch (error) {
            console.log(error)
            return null
        }
    }

  
    



    static async updateOrderStatus(data){
        try {
            const {order_code, status, shipper_id} = data
            const update_at = moment(new Date().toLocaleDateString('vi-VI'), 'DD-MM-YYYY').format('YYYY-MM-DD') + ' ' + new Date().toLocaleTimeString('vi-VI')
           

            let sqlUpdateOrderStatus = `CALL Update_Order_Status('${order_code}', ${status}, ${shipper_id}, '${update_at}');`

            await host.execute(sqlUpdateOrderStatus)

            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }


    static async getPromotionDetail(code){
        try {
            let sqlGetPromotionDetail = `CALL Get_Promotion_Detail('${code}');`
            const [promotion_detail, _] = await host.execute(sqlGetPromotionDetail)
           
            return promotion_detail[0]
        } catch (error) {
            console.log(error)
            return null   
        }
    }

    static async getEcouponDetail(code){
        try {
            let sqlGetEcoupontionDetail = `CALL Get_Ecoupon_Detail('${code}');`
            const [ecoupon_detail, _] = await host.execute(sqlGetEcoupontionDetail)

            return ecoupon_detail[0]
        } catch (error) {
            console.log(error)
            return null   
        }
    }


    static async getPromos(code){
        try {
         
            if(code[0].toUpperCase() === 'P'){
                const _promotion_detail = await this.getPromotionDetail(code)
                const promotion_detail = _promotion_detail[0]
              
                return {
                    promos_name : promotion_detail['promotion_name'],
                    promos_description : promotion_detail['promotion_description'],
                    promos_value : promotion_detail['promotion_value'],
                    promos_status : promotion_detail['promotion_status'],
                    promos_max_discount_value : promotion_detail['max_discount_value'],
                    promos_min_order_value : promotion_detail['min_order_value'],
                    promos_methode_payment : promotion_detail['payment_method_id'] === 1 ? "Cash" : promotion_detail['payment_method_id'] === 2 ? "Momo" : "Card",
                    promos_start_date : promotion_detail['start_date'],
                    promos_expire_date : promotion_detail['expire_date'],
                    promos_limited_offer : promotion_detail['limited_offer']
                }

            }else if(code[0].toUpperCase() === 'E'){
                const _ecoupon_detail = await this.getEcouponDetail(code)
                const ecoupon_detail = _ecoupon_detail[0]
                
                return {
                    promos_name : ecoupon_detail['ecoupon_name'],
                    promos_description : ecoupon_detail['ecoupon_description'],
                    promos_value : ecoupon_detail['ecoupon_value'],
                    promos_status : ecoupon_detail['ecoupon_status'],
                    promos_max_discount_value : ecoupon_detail['max_discount_value'],
                    promos_min_order_value : ecoupon_detail['min_order_value'],
                    promos_methode_payment : ecoupon_detail['payment_method_id'] === 1 ? "Cash" : promotion_detail['payment_method_id'] === 2 ? "Momo" : "Card",
                    promos_start_date : ecoupon_detail['start_date'],
                    promos_expire_date : ecoupon_detail['expire_date'],
                    promos_limited_offer : ecoupon_detail['limited_offer']
                }
            }
        } catch (error) {
            console.log(error)
            return null

        }
    }

    static async getPromotionMoney(data){
        
        try {
           
            const {code, sub_total} = data
        
            if(code[0].toUpperCase() === 'P'){
                const _promotion_detail = await this.getPromotionDetail(code)
                const promotion_detail = _promotion_detail[0]
                if(sub_total < promotion_detail['min_order_value'] || promotion_detail['limited_offer'] < 1)
                    return 0
                else{
                    let p_money = sub_total*promotion_detail['promotion_value']
                    return p_money > promotion_detail['max_discount_value'] ? promotion_detail['max_discount_value'] : p_money
                }
            }
            else if(code[0].toUpperCase() === 'E'){
                const _ecoupon_detail = await this.getEcouponDetail(code)
                const ecoupon_detail = _ecoupon_detail[0]
                


                if(sub_total < ecoupon_detail['min_order_value'] || ecoupon_detail['limited_offer'] < 1)
                    return 0
                else{
                    let p_money = sub_total*ecoupon_detail['ecoupon_value']
                    
                    return p_money > ecoupon_detail['max_discount_value'] ? ecoupon_detail['max_discount_value'] : p_money
                }
            }
        } catch (error) {
            console.log(error)
            
            return 0;
        }
    }


    static async addOrderReview(data){
        try {
            const {order_id, create_at, content, image, stars} = data
            let sqlAddOrderReview = `CALL Add_Order_Review(${order_id}, '${create_at}', '${content}', '${image}', ${stars});`

            await host.execute(sqlAddOrderReview)
            
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    static async addShipperReview(data){
        try {
            const {order_id, create_at, content, stars} = data
            let sqlAddShipperReview = `CALL Add_Order_Review(${order_id}, '${create_at}', '${content}', ${stars});`


            await host.execute(sqlAddShipperReview)

            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    static async updatePaymentStatus(data){
        try {
            const {order_id} = data
            let sqlUpdatePaymentStatus = `CALL Update_Payment_Status(${order_id});`
            await host.execute(sqlUpdatePaymentStatus)

            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    

}


module.exports = OrderModel