require("dotenv").config();

"user strict"
const nodemailer = require("nodemailer");


const sendgridMail = require('@sendgrid/mail');
const geneString = require("../constant/genestring");

sendgridMail.setApiKey(process.env.API_KEY_MAIL)

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const UserModel = require("../models/usermodel");

var randomString = require("randomstring")
//

const host = require('../../config/connectMySql')

const moment = require('moment');
const { parseTwoDigitYear } = require("moment");

const Geolib = require('geolib');
const e = require("express");


class UserAction{

    static async sendEmailToResestPassword(phone, email){
        

        try {
            var newpassword = geneString(6)

            const salt = await bcrypt.genSalt(10)
            var new_HashPassword = await bcrypt.hash(newpassword, salt);
            const [result, _] = await UserModel.resestPassword(phone, new_HashPassword)


            const content = {
                from : 'thanhviet0377@gmail.com',
                to : email,
                subject : 'Resest your password',
                text : `Your password is : ${newpassword}`,
              }
            
              sendgridMail.send(content, (err, info) => {
                if(err){
                    console.log(err)
                    return false
                }
                else{
                    console.log(info)
                    return true
                }
            
              })
            
        } catch (error) {
            console.log(error)
            return false
        }


    }

    static async sendEmailToVerify(email){
        

        try {
            var code = randomString.generate({
                length : 6,
                charset : 'numeric'
            })
            var verifyEmailToken = jwt.sign({email}, code, {
                expiresIn : '300s'
            })
           
            const content = {
                from : 'thanhviet0377@gmail.com',
                to : email,
                subject : 'Verify your email',
                text : `Your code to verify is : ${code}`,
              }
            
              await sendgridMail.send(content, (err, info) => {
                if(err){
                    console.log(err)
                    return {
                        verifyEmailToken : null,
                        code : null
                    }
                }
                else{
                 //   console.log(info)
                  
                    const result = {
                        verifyEmailToken : verifyEmailToken,
                        code : code
                    }
                    return result
                }
            
              })
              return {
                verifyEmailToken : verifyEmailToken,
                code : code
            }
            
        } catch (error) {
            console.log(error)
            return {
                verifyEmailToken : null,
                code : null
            }
        }


    }


    static async loginWithOtp(phone, otp){


        console.log("user")
        var [user, _] = await UserModel.findUserByPhone(phone)
        
        

        if(otp === '123456' && user[0]['phone'] !== null)
        {
           
          
            var refreshToken = jwt.sign({phone, otp}, process.env.REFRESH_TOKEN_SECRET)
            return {
                token : refreshToken,
                status : true
            }
        }
        else{
            return {
                status : false
            }
        }
        
    }

    static async getAccessToken(data){
        if(!data.token){
            return null
        }
        else{
            try {

                const decoded_info = jwt.verify(data.token,process.env.REFRESH_TOKEN_SECRET)
                console.log(decoded_info)
                if(decoded_info['phone'])
                {
                    var [result, _] = await UserModel.findUserByPhone(decoded_info['phone'])
                    if(result[0]['user_token']===data.token){
                        const decoded = jwt.verify(data.token,process.env.REFRESH_TOKEN_SECRET)
                        if(decoded['iat']){
                            var accessToken = jwt.sign({phone:decoded_info['phone']}, process.env.ACCESS_TOKEN_SECRET, {
                                expiresIn : "300s"
                            })
    
                            return accessToken
                        }
                    }
                    else{
                        return null
                    }
                }
                else{
                    if(decoded_info['email'])
                    {
                        var [result, _] = await UserModel.findUserByEmail(decoded_info['email'])
                        if(result[0]['user_token']===data.token){
                            const decoded = jwt.verify(data.token,process.env.REFRESH_TOKEN_SECRET)
                            if(decoded['iat']){
                                var accessToken = jwt.sign({email:decoded_info['email']}, process.env.ACCESS_TOKEN_SECRET, {
                                    expiresIn : "300s"
                                })
        
                                return accessToken
                            }
                        }
                        else{
                            return null
                        }
                    }
                }
        
                
                
                
            
               
                
            } catch (error) {
                console.log(error)
                return null
            }
            
    
        }
    }

    static async getProviderId(userID){
        try {
            let sql = `SELECT provider_id FROM Tastie.Provider WHERE user_id = ${userID};`

            const [result, _] = await host.execute(sql)

            return result

        } catch (error) {
            
            console.log(error)
            return null
        }
    }

    static async getOperationsTime(provider_id){
        let sqlGetOperation = `SELECT * FROM Tastie.Operation where provider_id = ${provider_id};`

            const [opetations, _] = await host.execute(sqlGetOperation)

            let sqlGetStatusProvider = `SELECT status FROM Provider where provider_id = ${provider_id};`

            const statusProvider = await host.execute(sqlGetStatusProvider)

            
            var monday = {}, tuesday = {}, wednesday = {}, thursday = {}, friday = {}, saturday = {}, sunday = {}

            const dateNumber = new Date().getDay()

            for(var i = 0; i < opetations.length; i++){
                if(opetations[i]['day'] === "2")
                {
                    monday = {
                        is_day_off: dateNumber !== 1 || statusProvider[0][0]['status'] !== 0 ? false : true,
                        open_time: opetations[i]['open_time'],
                        close_time: opetations[i]['close_time']
                    }
                }
                if(opetations[i]['day'] === "3")
                {
                    tuesday = {
                        is_day_off: dateNumber !== 2 || statusProvider[0][0]['status'] !== 0 ? false : true,
                        open_time: opetations[i]['open_time'],
                        close_time: opetations[i]['close_time']
                    }
                }
                if(opetations[i]['day'] === "4")
                {
                    wednesday = {
                        is_day_off: dateNumber !== 3 || statusProvider[0][0]['status'] !== 0 ? false : true,
                        open_time: opetations[i]['open_time'],
                        close_time: opetations[i]['close_time']
                    }
                }
                if(opetations[i]['day'] === "5")
                {
                    thursday = {
                        is_day_off: dateNumber !== 4 || statusProvider[0][0]['status'] !== 0 ? false : true,
                        open_time: opetations[i]['open_time'],
                        close_time: opetations[i]['close_time']
                    }
                }
                if(opetations[i]['day'] === "6")
                {
                    friday = {
                        is_day_off: dateNumber !== 5 || statusProvider[0][0]['status'] !== 0 ? false : true,
                        open_time: opetations[i]['open_time'],
                        close_time: opetations[i]['close_time']
                    }
                }
                if(opetations[i]['day'] === "7")
                {
                    saturday = {
                        is_day_off: dateNumber !== 6 || statusProvider[0][0]['status'] !== 0 ? false : true,
                        open_time: opetations[i]['open_time'],
                        close_time: opetations[i]['close_time']
                    }
                }
                if(opetations[i]['day'] === "1")
                {
                    sunday = {
                        is_day_off: dateNumber !== 0 || statusProvider[0][0]['status'] !== 0 ? false : true,
                        open_time: opetations[i]['open_time'],
                        close_time: opetations[i]['close_time']
                    }
                }
            }


            var operation_time  = {
                monday,
                tuesday,
                wednesday,
                thursday,
                friday,
                saturday,
                sunday
            }
            return operation_time
    }


    static async getListReview(provider_id){
        try {
            
            let sqlGetListReview = `CALL Get_List_Review(${provider_id});`

            const [ListReview, _] = await host.execute(sqlGetListReview)
            const listReview = ListReview[0]
            const response = []

          

            for(var i = 0; i < listReview.length; i++){
                let newReview = {
                    order_id: listReview[i]["order_id"] ? listReview[i]["order_id"] : null,
                    customer_info: {
                        username: `${listReview[i]['first_name'] ? listReview[i]['first_name'] : null}  ${listReview[i]['last_name']
                     ? listReview[i]['last_name'] : null}}`,
                        avatar: listReview[i]['avatar'] ? listReview[i]['avatar'] : null
                    },
                    create_at: listReview[i]['create_at'] ? listReview[i]['create_at'] : null,
                    content: listReview[i]['content'] ? listReview[i]['content'] : null,
                    image: listReview[i]['image'] ? listReview[i]['image'] : null,
                    stars: listReview[i]['stars'] ? listReview[i]['stars'] : null
                
                }

                response.push(newReview)

            }

           

            return response

        } catch (error) {
            console.log(error)
            return null

        }
    }


    static async getCartDetail(user_id){
        try {
            let sqlGetCartDetail = `CALL Get_Cart_Detail (${user_id})`
            const [result, _] = await host.execute(sqlGetCartDetail)
            const listCardDetail = result[0]
    
            var response = {
                providerID: listCardDetail[0]['provider_id'] ? listCardDetail[0]['provider_id'] : null, 
                providerName: listCardDetail[0]['merchant_name'] ? listCardDetail[0]['merchant_name'] : null,
                latitude: listCardDetail[0]['provider_latitude'] ? listCardDetail[0]['provider_latitude'] : null,
                longitude: listCardDetail[0]['provider_longitude'] ? listCardDetail[0]['provider_longitude'] : null,
                items : [

                ],
                subtotalPrice: 0,
                note: ""

            }
            for(var i = 0; i < listCardDetail.length; i++)
            {
                let objCart = listCardDetail[i]
                
                let product_index = response.items.findIndex((product) => {
                    return (product['product_id'] === objCart['product_id'] && product['item_code'] === objCart['item_code'])
                })
                if(product_index < 0){
                    let newProduct = {
                        product_id: objCart['product_id'] ? objCart['product_id'] : null,
                        productName: objCart['product_name'] ? objCart['product_name'] : null, 
                        productPrice: objCart['product_price'] ? objCart['product_price'] : 0, 
                        productImage: objCart['product_image'] ? objCart['product_image'] : null, 
                        additionalOptions: [
                            {
                                label: objCart['label_product_option_in_cart'] ? objCart['label_product_option_in_cart'] : null,
                                value: objCart['value_product_option_in_cart'] ? objCart['value_product_option_in_cart'] : null,
                                price: objCart['product_option_price'] ? objCart['product_option_price'] : 0
                                
                            }
	                    ], 
                        totalProductPrice: 0,
                        quantity: objCart['product_quantity_in_cart'] ? objCart['product_quantity_in_cart'] : 0,
                        specialInstruction: objCart['special_instruction'] ? objCart['special_instruction'] : null,
                        item_code : objCart['item_code']
                    }
                    response.items.push(newProduct)
                }
                else{
                    let index_option = response.items[product_index]['additionalOptions'].findIndex((option) => {
                        return (option['label'] === objCart['label_product_option_in_cart'] && option['value'] === objCart['value_product_option_in_cart'])
                    })
                    if(index_option < 0){
                        var newOption = {
                            label: objCart['label_product_option_in_cart'] ? objCart['label_product_option_in_cart'] : null,
                            value: objCart['value_product_option_in_cart'] ? objCart['value_product_option_in_cart'] : null,
                            price: objCart['product_option_price'] ? objCart['product_option_price'] : 0
                           
                        }
                        response.items[product_index]['additionalOptions'].push(newOption)
                    }
                    else{
                        let newProduct = {
                            product_id: objCart['product_id'] ? objCart['product_id'] : null,
                            productName: objCart['product_name'] ? objCart['product_name'] : null, 
                            productPrice: objCart['product_price'] ? objCart['product_price'] : 0, 
                            productImage: objCart['product_image'] ? objCart['product_image'] : null, 
                            additionalOptions: [
                                {
                                    label: objCart['label_product_option_in_cart'] ? objCart['label_product_option_in_cart'] : null,
                                    value: objCart['value_product_option_in_cart'] ? objCart['value_product_option_in_cart'] : null,
                                    price: objCart['product_option_price'] ? objCart['product_option_price'] : 0
                                    
                                }
                            ], 
                            totalProductPrice: 0,
                            quantity: objCart['product_quantity_in_cart'] ? objCart['product_quantity_in_cart'] : 0,
                            specialInstruction: objCart['special_instruction'] ? objCart['special_instruction'] : null,
                            item_code : objCart['item_code']
                        }
                        response.items.push(newProduct)
                    }
                   
                }
            }


            // Tinh tien

            let _totalProductPrice = 0, _subtotalPrice = 0 
            for(var i = 0; i < response.items.length; i++){
                // Tinh tien option
                if(response.items[i]['additionalOptions'].length > 0){
                    for(var j = 0; j < response.items[i]['additionalOptions'].length; j++){
                        _totalProductPrice += response.items[i]['additionalOptions'][j]['price']
                    }
                }
                _totalProductPrice += response.items[i]['productPrice']*response.items[i]['quantity']
                response.items[i]['totalProductPrice'] = _totalProductPrice
                _subtotalPrice += _totalProductPrice
            }

            response['subtotalPrice'] = _subtotalPrice

            return response

        } catch (error) {
            console.log(error)
            return null
        }
    }


    //
    static sleepFor(sleepDuration){
        var now = new Date().getTime();
        while(new Date().getTime() < now + sleepDuration){ 
            /* Do nothing */ 
        }
    }

    static generateUUID() { // Public Domain/MIT
        var d = new Date().getTime();//Timestamp
        var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    
        console.log(d)
        console.log("++++++++++++")
        console.log(d2)
        console.log("***************************")
    
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16;//random number between 0 and 16
            if(d > 0){//Use timestamp until depleted
                r = (d + r)%16 | 0;
                d = Math.floor(d/16);
            } else {//Use microseconds since page-load if supported
                r = (d2 + r)%16 | 0;
                d2 = Math.floor(d2/16);
            }
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }

    static async insertProductIntoCart(data){
        try {
            const item_code = this.generateUUID()
            const {user_id, product_id, special_instruction, quantity, additional_option} = data
            console.log(additional_option.length)
            if(additional_option.length  <= 0){
                let sqlInsertProductIntoCart = `CALL Insert_Product_Into_Cart(${user_id}, ${product_id}, '?', '?', '${special_instruction}', ${quantity}, '${item_code}');`
                await host.execute(sqlInsertProductIntoCart)
                this.sleepFor(1000)
                
            }
            else{
                for(var i = 0; i < additional_option.length; i++){
                    let sqlInsertProductIntoCart = `CALL Insert_Product_Into_Cart(${user_id}, ${product_id}, '${additional_option[i]['label']}', '${additional_option[i]['value']}', '${special_instruction}', ${quantity}, '${item_code}');`
                    await host.execute(sqlInsertProductIntoCart)
                    this.sleepFor(1000)
                }
            }
            

            return item_code

        } catch (error) {
            console.log(error)
            return null
        }
    }

    static async updateQuantityAndNoteIntoCartDetail(data){
        
        try {
            const {user_id, product_id, special_instruction, quantity, item_code} = data

            let sqlUpdateQtyAndNoteCartDetail = `CALL Update_Qty_Note_Product_Into_Cart (${user_id}, ${product_id}, '${special_instruction}', ${quantity}, '${item_code}');`

            


            await host.execute(sqlUpdateQtyAndNoteCartDetail)
            this.sleepFor(1000)
            var response = await this.getCartDetail(user_id)

            return response


        } catch (error) {
            console.log(error)
            return null
        }
    }


    static async updateValueOfLabel(data){
        try {
            const {user_id, product_id, label, value,item_code} = data

            let sqlUpdateValueOfLabelCartDetail = `CALL Update_Value_Product_Into_Cart (${user_id}, ${product_id}, '${label}', '${value}', '${item_code}');`
            await host.execute(sqlUpdateValueOfLabelCartDetail)
            this.sleepFor(1000)
            var response = await this.getCartDetail(user_id)

            return {
                status : true,
                response
            }


        } catch (error) {
            console.log(error)
            return {
                status : false,
                response : null
            }
        }
    }


    static async updateLabelOfProduct(data){
        try {
            const {user_id, product_id, label, value, item_code, type} = data

            let sqlUpdateLabelOfProductCartDetail = `CALL Update_Label_Product_Into_Cart (${user_id}, ${product_id}, '${label}', '${value}', '${item_code}', ${type});`
            await host.execute(sqlUpdateLabelOfProductCartDetail)
            this.sleepFor(1000)
            var response = await this.getCartDetail(user_id)

            return {
                status : true,
                response
            }


        } catch (error) {
            console.log(error)
            return {
                status : false,
                response : null
            }
        }
    }


    static async deleteCartDetail(data){
        
        try {
            const {user_id, product_id, item_code} = data

            let sqlUpdateCartDetail = `CALL Delete_Product_Into_Cart (${user_id}, ${product_id}, '${item_code}');`
            await host.execute(sqlUpdateCartDetail)
            

            return true


        } catch (error) {
            console.log(error)
            return false
        }
    }


    static  delivery_fee(distance){

        if(distance <= 0)
        {
            return 0
        }
        let convertDistance= distance /1000
        
        if(convertDistance > 15)
        {
            return 0
        }
        else{
            if(convertDistance <= 3){
                return 15000
            }
            else if(convertDistance > 3 && convertDistance <= 4){
                return 18000
            }
            else if(convertDistance > 4 && convertDistance <= 5){
                return 20000
            }
            else if(convertDistance > 5 && convertDistance <= 15){
                let tmp = convertDistance - 5
                let convert_distance = Math.ceil(tmp)
                return 20000 + convert_distance*2500   
            }
        }
    }


    static async DeliveryFeeToCheckOut(data){
        const {longitude, latitude, provider_id} = data
        try {
            let sqlSelectProvider = `SELECT * FROM Tastie.Provider where provider_id = ${provider_id};`
            const [provider, _] = await host.execute(sqlSelectProvider)
            
            var distance = Geolib.getDistance({
                latitude: latitude, longitude: longitude
            },{ latitude: parseFloat(provider[0]['latitude']) > 0 ? parseFloat(provider[0]['latitude']) : 0, longitude: parseFloat(provider[0]['longitude'])  > 0 ? parseFloat(provider[0]['longitude']) : 0})

            return this.delivery_fee(distance)

        } catch (error) {
            console.log(error)
            return null
        }
    }


    static  delivery_fee(distance){
        let convertDistance= distance /1000
        if(convertDistance > 15)
        {
            return 0
        }
        else{
            if(convertDistance <= 3){
                return 15000
            }
            else if(convertDistance > 3 && convertDistance <= 4){
                return 18000
            }
            else if(convertDistance > 4 && convertDistance <= 5){
                return 20000
            }
            else if(convertDistance > 5 && convertDistance <= 15){
                let tmp = convertDistance - 5
                let convert_distance = Math.ceil(tmp)
                return 20000 + convert_distance*2500   
            }
        }
    }

    static async SearchBar(data){
        try {
            const {q, type, longitude, latitude} = data


            // long : 106.68250448518744, lat : 10.763019107348029
            let sqlSelectProvider = `SELECT * FROM Tastie.Provider;`
            const [list_provider, _] = await host.execute(sqlSelectProvider)
            var _list_provider = list_provider.filter((provider)=> {
                var distance = Geolib.getDistance({
                    latitude, longitude
                },{ latitude: parseFloat(provider['latitude']), longitude: parseFloat(provider['longitude'])})

                return distance <= 15000
            })

           // console.log(_list_provider)

            // search theo provider
            if(type === "1"){   

                _list_provider = _list_provider.filter((provider)  => {
                   
                    return provider.merchant_name.toLowerCase().includes(q.toLowerCase())
                })
                var response = {
                    q,
                    type: "provider",
                    total_count: _list_provider.length,
                    start: 0,
                    per_page: 20,
                    items : [

                    ]
                }


                for(var i = 0; i < _list_provider.length; i++){
                    let operation_time =  await this.getOperationsTime(_list_provider[i].provider_id)
                    var distance = Geolib.getDistance({
                        latitude, longitude
                    },{ latitude: parseFloat(_list_provider[i]['latitude']), longitude: parseFloat(_list_provider[i]['longitude'])})

                    let delivery_fee = this.delivery_fee(distance)
                    var new_item = {
                        name: _list_provider[i].merchant_name,
                        provider_id : _list_provider[i].provider_id,
                        avatar: _list_provider[i].avatar,
                        estimated_cooking_time: _list_provider[i].estimated_cooking_time,
                        rating: _list_provider[i].rating,
                        isFavorite: false,
                        currentPromotion: null,
                        latitude: _list_provider[i]['latitude'], 
                        longitude: _list_provider[i]['longitude'],
                        address: _list_provider[i]['address'],
                        price_range: _list_provider[i]['price_range'],
                        profile_pic: _list_provider[i]['avatar'],
                        has_promo: true,
                        customer_rating: _list_provider[i]['rating'],
                        order_totals : _list_provider[i]['order_totals'],
                        distance,
                        delivery_fee,
                        operation_time
                    }

                    response.items.push(new_item)
            

                
                }
                return response

            }
            else{
                if(type === "2"){
                    let sqlSelectProduct = `CALL Search_Product('${q}');`
                    const result_product_search = await host.execute(sqlSelectProduct)
                    var product_list = result_product_search[0][0]
                    
                  
                    _list_provider = _list_provider.filter((provider)  => {
                        
                        
                        var index = product_list.findIndex((product) => {
                            if(product['provider_id'] === provider['provider_id'])
                                return true
                            else
                                return false
                        })
                        return index >= 0
                    })


                    var response = {
                        q,
                        type: "product",
                        total_count: _list_provider.length,
                        start: 0,
                        per_page: 20,
                        items : [
    
                        ]
                    }
                    
                    
                    for(var i = 0; i < _list_provider.length; i++){
                        let operation_time =  await this.getOperationsTime(_list_provider[i].provider_id)
                        var distance = Geolib.getDistance({
                            latitude, longitude
                        },{ latitude: parseFloat(_list_provider[i]['latitude']), longitude: parseFloat(_list_provider[i]['longitude'])})

                        let delivery_fee = this.delivery_fee(distance)
                        var new_item = {
                            name: _list_provider[i].merchant_name,
                            provider_id : _list_provider[i].provider_id,
                            avatar: _list_provider[i].avatar,
                            estimated_cooking_time: _list_provider[i].estimated_cooking_time,
                            rating: _list_provider[i].rating,
                            isFavorite: false,
                            currentPromotion: null,
                            latitude: _list_provider[i]['latitude'], 
                            longitude: _list_provider[i]['longitude'],
                            address: _list_provider[i]['address'],
                            price_range: _list_provider[i]['price_range'],
                            profile_pic: _list_provider[i]['avatar'],
                            has_promo: true,
                            customer_rating: _list_provider[i]['rating'],
                            order_totals : _list_provider[i]['order_totals'],
                            distance,
                            delivery_fee,
                            operation_time
                        }
    
                        response.items.push(new_item)
                

                    
                    }

                

                    return response
                }
                else if(type === "3"){ // provider_category
                    const {category_infor} = data
                    var provider_id_list = null
                    if(category_infor.category_type === "1"){
                        let sqlSelectProduct = `CALL Get_Provider_By_Provider_Category('${category_infor.category_id}');`
                        const result_category_search = await host.execute(sqlSelectProduct)
                        var provider_id_list = result_category_search[0][0]
                    
                    
                        
                    }
                    else if(category_infor.category_type === "2")
                    {
                        let sqlSelectProduct = `CALL Get_Provider_By_Cuisine_Category('${category_infor.category_id}');`
                        const result_category_search = await host.execute(sqlSelectProduct)
                        var provider_id_list = result_category_search[0][0]
                    }

                    console.log(_list_provider)

                    _list_provider = _list_provider.filter((provider)  => {
                            
                            
                        var index = provider_id_list.findIndex((p) => {
                            if(p['provider_id'] === provider['provider_id'])
                                return true
                            else
                                return false
                        })
                        return index >= 0
                    })


                    var response = {
                        q,
                        type: "provider_category",
                        total_count: _list_provider.length,
                        start: 0,
                        per_page: 20,
                        items : [
    
                        ]
                    }


                    for(var i = 0; i < _list_provider.length; i++){
                        let operation_time =  await this.getOperationsTime(_list_provider[i].provider_id)
                        var distance = Geolib.getDistance({
                            latitude, longitude
                        },{ latitude: parseFloat(_list_provider[i]['latitude']), longitude: parseFloat(_list_provider[i]['longitude'])})

                        let delivery_fee = this.delivery_fee(distance)
                        var new_item = {
                            name: _list_provider[i].merchant_name,
                            provider_id : _list_provider[i].provider_id,
                            avatar: _list_provider[i].avatar,
                            estimated_cooking_time: _list_provider[i].estimated_cooking_time,
                            rating: _list_provider[i].rating,
                            isFavorite: false,
                            currentPromotion: null,
                            latitude: _list_provider[i]['latitude'], 
                            longitude: _list_provider[i]['longitude'],
                            address: _list_provider[i]['address'],
                            price_range: _list_provider[i]['price_range'],
                            profile_pic: _list_provider[i]['avatar'],
                            has_promo: true,
                            customer_rating: _list_provider[i]['rating'],
                            order_totals : _list_provider[i]['order_totals'],
                            distance,
                            delivery_fee,
                            operation_time
                        }
    
                        response.items.push(new_item)
                

                    
                    }
                    return response
                    
                }
            }
        } catch (error) {
            
            console.log(error)

            return null

        }
    }


    static async getCustomerAdress(user_id) {
        try {
            let sqlSelectCustomerAdress = `CALL Get_Customer_Contact(${user_id});`
            const [list_address, _] = await host.execute(sqlSelectCustomerAdress)

            const respone = {
                user_id,
                user_phone: list_address[0][0]['phone'] ? list_address[0][0]['phone'] : null,
                user_address: [
                ]
            }

            for(var i = 0; i < list_address[0].length; i++){
                let new_adress = {
                    address: list_address[0][i]['address'],
                    latitude: list_address[0][i]['latitude'],
                    longitude: list_address[0][i]['longitude'],
                    type : list_address[0][i]['type']
                }
                respone.user_address.push(new_adress)
            }

            return respone
        } catch (error) {
            console.log(error)
            return null
        }
    }


    static convertOperation(open_time, close_time){
        var open_hours = parseInt(open_time.split(':')[0])  
        var open_minus = parseInt(open_time.split(':')[1])  
        var close_hours = parseInt(close_time.split(':')[0])  
        var close_minus = parseInt(close_time.split(':')[1]) 
    
        var schedule_operation = []
        while((open_hours*60 + open_minus) <= (close_hours*60 + close_minus)){
            if((open_hours*60 + open_minus + 30) <= (close_hours*60 + close_minus))
            {
                let start_time = `${open_hours}:${open_minus}`
              
                
                open_hours = open_minus + 30 >= 60 ? open_hours + 1: open_hours
                open_minus = open_minus + 30 >= 60 ? (open_minus + 30) - 60 : open_minus + 30
                
    
                let end_time = `${open_hours}:${open_minus}`
                var time  =  start_time + " - " + end_time
                
                schedule_operation.push(time)
            }
            else{
                let start_time = `${open_hours}:${open_minus}`
                let end_time = `${close_hours}:${close_minus}`
                var time =  start_time + " - " + end_time

                schedule_operation.push(time)
                
                return schedule_operation
            }
        }
        return schedule_operation
    }

    static async getSchedule_Operation(provider_id){
        try {

            const operation_time = await this.getOperationsTime(provider_id)

            var current_time = Date.now()
            var convertUTC = new Date(current_time).toUTCString()
            var convertMomen = moment(convertUTC).format("ddddddddd, DD MMM YYYY HH:mm:ss [GMT]")
            var convertUTC_next_day = moment(convertUTC).utc().add(24,'h').format("ddddddddd, DD MMM YYYY HH:mm:ss [GMT]")
            var convertUTC_next_next_day = moment(convertUTC).utc().add(48,'h').format("ddddddddd, DD MMM YYYY HH:mm:ss [GMT]")
            var getDayCurrent = convertMomen.split(",")[0]
            var getDayOfNextDay = convertUTC_next_day.split(",")[0]
            var getDayOfNextNextDay = convertUTC_next_next_day.split(",")[0]

          console.log(operation_time.sunday)
            var respone = [
                {
                    schedule_date: convertUTC,
                    day : getDayCurrent.slice(0, (getDayCurrent.indexOf(getDayCurrent[0], 1))).toLowerCase(),
                    schedule_time : [
                    ]
                },
                {
                    schedule_date: moment(convertUTC).utc().add(24,'h').format("ddd, DD MMM YYYY HH:mm:ss [GMT]"),
                    day : getDayOfNextDay.slice(0, (getDayOfNextDay.indexOf(getDayOfNextDay[0], 1))).toLowerCase(),
                    schedule_time : [
                        
                    ]
                },
                {
                    schedule_date: moment(convertUTC).utc().add(48,'h').format("ddd, DD MMM YYYY HH:mm:ss [GMT]"),
                    day : getDayOfNextNextDay.slice(0, (getDayOfNextNextDay.indexOf(getDayOfNextNextDay[0], 1))).toLowerCase(),
                    schedule_time : [
                        
                    ]
                }
            ]
            respone[0].schedule_time = this.convertOperation(operation_time[respone[0].day]['open_time'], operation_time[respone[0].day]['close_time'])
            respone[1].schedule_time = this.convertOperation(operation_time[respone[1].day]['open_time'], operation_time[respone[1].day]['close_time'])
            respone[2].schedule_time = this.convertOperation(operation_time[respone[2].day]['open_time'], operation_time[respone[2].day]['close_time'])
            

            return respone
        } catch (error) {
            console.log(error)
            return null
        }
    }


    static async getAllCategory(){
        try {


            let sqlCuisineCategory = `SELECT * FROM Tastie.CuisineCategory;`
            let sqlFoodCategory = `SELECT * FROM Tastie.FoodCategory;`
            let sqlMainFoodCategory = `SELECT * FROM Tastie.MainFoodCategory;`
            let sqlProviderCategory = `SELECT * FROM Tastie.ProviderCategory;`


            const list_cuisine_category = await host.execute(sqlCuisineCategory)
            const list_food_category = await host.execute(sqlFoodCategory)
            const list_main_food_category = await host.execute(sqlMainFoodCategory)
            const list_provider_category = await host.execute(sqlProviderCategory)

            const _list_cuisine_category = list_cuisine_category[0]
            const _list_food_category = list_food_category[0]
            const _list_main_food_category = list_main_food_category[0]
            const _list_provider_category = list_provider_category[0]

            
            var response = {
                cuisine_category : _list_cuisine_category,
                food_category : _list_food_category,
                main_food_category : _list_main_food_category,
                provider_category : _list_provider_category
            }

            response.cuisine_category = response.cuisine_category.map((category) => {
                return {
                  category_id : category.cuisine_category_id,
                  category_name: category.cuisine_category_name,
                  icon_url : category.icon_url ? category.icon_url : ""
                }
            });

            response.food_category = response.food_category.map((category) => {
                return {
                  category_id : category.food_category_id,
                  category_name: category.food_category_name
                  //icon_url : category.icon_url ? category.icon_url : ""
                }
            });

            response.main_food_category = response.main_food_category.map((category) => {
                return {
                  category_id : category.main_food_category_id,
                  category_name: category.main_food_category_name
                 // icon_url : category.icon_url ? category.icon_url : ""
                }
            });

            response.provider_category = response.provider_category.map((category) => {
                return {
                  category_id : category.provider_category_id,
                  category_name: category.provider_category_name,
                  icon_url : category.icon_url ? category.icon_url : ""
                }
            });


            return response
        } catch (error) {
            return []
        }
    }



    static getUpdateAt(){
        return moment(new Date().toLocaleDateString('vi-VI'), 'DD-MM-YYYY').format('YYYY-MM-DD') + ' ' + new Date().toLocaleTimeString('vi-VI')
    }

   

}


module.exports = UserAction