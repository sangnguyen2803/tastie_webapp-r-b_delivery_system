require("dotenv").config();

const host = require('../../config/connectMySQL')

const Geolib = require('geolib')

class MerchantModel{



    // Done
    static async addProvider (data){
        const {user_id, registered_at, update_at} = data

        let sqlInsert = 
        `
            INSERT INTO Tastie.Provider (user_id, registered_at, update_at) VALUES (${user_id}, '${registered_at}', '${update_at}')
        `
        try {
            const [result, _] = await host.execute(sqlInsert);
            return result
        } catch (error) {
            console.log(error)
            return null
        }
        
    }

    // Done
    static async providerUpdate_Form1(prodvider_id,data){
        const {merchant_name, address, road, hotline, city_id, district_id, ward_id, latitude, longitude,
            registered_at, update_at} = data
        
        let sqlUpdate = 
        `
            CALL ProviderUpdate_Form1(${prodvider_id}, '${merchant_name}', '${address}', '${road}', ${hotline}, 
            ${city_id}, ${district_id}, ${ward_id}, '${latitude}', '${longitude}', '${registered_at}', '${update_at}')
        `
        try {
            const [result, _] = await host.execute(sqlUpdate)
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    // Done
    static async providerUpdate_Form2(provider_id, data){
        const {company_name, company_address, owner_name, email, 
            owner_phone, owner_card_id, role, create_at, update_at, 
            owner_card_image1, owner_card_image2, tax_code} = data

        let sqlUpdate = 
        `
            CALL ProviderUpdate_Form2(${provider_id}, '${company_name}', '${company_address}', '${owner_name}', 
            '${email}', '${owner_phone}', '${owner_card_id}', '${role}', '${create_at}', '${update_at}', '${owner_card_image1}', 
            '${owner_card_image2}', '${tax_code}')
        `
        try {
            const [result, _] = await host.execute(sqlUpdate)
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    // Done
    static async getCategories(type){
        if(type === 'provider'){
            return await this.getProviderCategories()
        }
        else{
            if(type === 'cuisine'){
                return await this.getCuisineCategories()
            }
            else{
                if(type === 'food'){
                    return await this.getFoodCategories()
                }
                else{
                    if(type === 'main-food'){
                        return await this.getMainFoodCategories()
                    }
                }
            }
        }
    }

    // Done
    static async getFoodCategories(){
        try {
            let sqlSelect = `SELECT * FROM Tastie.FoodCategory;`
            const [result, _] = await host.execute(sqlSelect)
            
            var convert_result = []

            for(var i = 0; i < result.length; i++){
                
                let new_FoodCategory = {
                    "category_id" : result[i]["food_category_id"],
                    "category_name" : result[i]["food_category_name"],
                    "parent_category_id" : result[i]["main_food_category_id"]

                }
        
                convert_result.push(new_FoodCategory)
                
            }
            
            return  convert_result
        } catch (error) {
            console.log(error)
            return null
        }
        
    }


    // Done
    static async getMainFoodCategories(){
        try {
            let sqlSelect = `SELECT * FROM Tastie.MainFoodCategory;`
            const [result, _] = await host.execute(sqlSelect)
            
            var convert_result = []

            for(var i = 0; i < result.length; i++){
                
                let new_MainFoodCategory = {
                    "category_id" : result[i]["main_food_category_id"],
                    "category_name" : result[i]["main_food_category_name"]
                }
        
                convert_result.push(new_MainFoodCategory)
                
            }
            
            return  convert_result
        } catch (error) {
            console.log(error)
            return null
        }
        
    }


    // Done
    static async getProviderCategories(){
        try {
            let sqlSelect = `CALL Get_Provider_Categories()`
            const [result, _] = await host.execute(sqlSelect)
            
            var convert_result = []

            for(var i = 0; i < result[0].length; i++){
                
                let new_cuisineCategory = {
                    "category_id" : result[0][i]["provider_category_id"],
                    "category_name" : result[0][i]["provider_category_name"]
                }
        
                convert_result.push(new_cuisineCategory)
                
            }
            console.log(convert_result)
            return  convert_result
        } catch (error) {
            console.log(error)
            return null
        }
        
    }

    // Done
    static async getCuisineCategories(){
        try {
            let sqlSelect = `CALL Get_Cuisine_Categories()`
            const [result, _] = await host.execute(sqlSelect)

            var convert_result = []

            for(var i = 0; i < result[0].length; i++){
                
                let new_cuisineCategory = {
                    "category_id" : result[0][i]["cuisine_category_id"],
                    "category_name" : result[0][i]["cuisine_category_name"]
                }
        
                convert_result.push(new_cuisineCategory)
                
            }
            console.log(convert_result)
            return  convert_result
        } catch (error) {
            console.log(error)
            return null
        }
        
    }


    // Done
    static async providerUpdate_Form3(provider_id, data){
        const {keyword, description, avatar, cover_picture, facade_photo,  provider_category_id,
        cuisine_category_id, rush_hour, create_at, update_at} = data
        const monday = {
            is_day_off : data.operating.monday.is_day_off,
            open_time : data.operating.monday.is_day_off ? data.operating.monday.open_time : '00:00:00',
            close_time : data.operating.monday.is_day_off ? data.operating.monday.close_time : '00:00:00'
        }
        const tuesday = {
            is_day_off : data.operating.tuesday.is_day_off,
            open_time : data.operating.tuesday.is_day_off ? data.operating.tuesday.open_time : '00:00:00',
            close_time : data.operating.tuesday.is_day_off ? data.operating.tuesday.close_time : '00:00:00'
        }
        const wednesday = {
            is_day_off : data.operating.wednesday.is_day_off,
            open_time : data.operating.wednesday.is_day_off ? data.operating.wednesday.open_time : '00:00:00',
            close_time : data.operating.wednesday.is_day_off ? data.operating.wednesday.close_time : '00:00:00'
        }
        const thursday = {
            is_day_off : data.operating.thursday.is_day_off,
            open_time : data.operating.thursday.is_day_off ? data.operating.thursday.open_time : '00:00:00',
            close_time : data.operating.thursday.is_day_off ? data.operating.thursday.close_time : '00:00:00'
        }
        const friday = {
            is_day_off : data.operating.friday.is_day_off,
            open_time : data.operating.friday.is_day_off ? data.operating.friday.open_time : '00:00:00',
            close_time : data.operating.friday.is_day_off ? data.operating.friday.close_time : '00:00:00'
        }
        const saturday = {
            is_day_off : data.operating.saturday.is_day_off,
            open_time : data.operating.saturday.is_day_off ? data.operating.saturday.open_time : '00:00:00',
            close_time : data.operating.saturday.is_day_off ? data.operating.saturday.close_time : '00:00:00'
        }
        const sunday = {
            is_day_off : data.operating.sunday.is_day_off,
            open_time : data.operating.sunday.is_day_off ? data.operating.sunday.open_time : '00:00:00',
            close_time : data.operating.sunday.is_day_off ? data.operating.sunday.close_time : '00:00:00'
        }

        let sql_Update_1 = 
        `
        CALL ProviderUpdate_Form3 (${provider_id}, N'${keyword}', N'${description}', '${avatar}', '${cover_picture}', '${facade_photo}', '2', '${monday.open_time}', '${monday.close_time}', '${rush_hour}', '${create_at}', '${update_at}')
        `
        let sql_Update_2 = 
        `
        CALL ProviderUpdate_Form3 (${provider_id}, N'${keyword}', N'${description}', '${avatar}', '${cover_picture}', '${facade_photo}', '3', '${tuesday.open_time}', '${tuesday.close_time}', '${rush_hour}', '${create_at}', '${update_at}')
        `
        let sql_Update_3 = 
        `
        CALL ProviderUpdate_Form3 (${provider_id}, N'${keyword}', N'${description}', '${avatar}', '${cover_picture}', '${facade_photo}', '4', '${wednesday.open_time}', '${wednesday.close_time}', '${rush_hour}', '${create_at}', '${update_at}')
        `
        let sql_Update_4 = 
        `
        CALL ProviderUpdate_Form3 (${provider_id}, N'${keyword}', N'${description}', '${avatar}', '${cover_picture}', '${facade_photo}', '5', '${thursday.open_time}', '${thursday.close_time}', '${rush_hour}', '${create_at}', '${update_at}')
        `
        let sql_Update_5 = 
        `
        CALL ProviderUpdate_Form3 (${provider_id}, N'${keyword}', N'${description}', '${avatar}', '${cover_picture}', '${facade_photo}', '6', '${friday.open_time}', '${friday.close_time}', '${rush_hour}', '${create_at}', '${update_at}')
        `
        let sql_Update_6 = 
        `
        CALL ProviderUpdate_Form3 (${provider_id}, N'${keyword}', N'${description}', '${avatar}', '${cover_picture}', '${facade_photo}', '7', '${saturday.open_time}', '${saturday.close_time}', '${rush_hour}', '${create_at}', '${update_at}')
        `
        let sql_Update_7 = 
        `
        CALL ProviderUpdate_Form3 (${provider_id}, N'${keyword}', N'${description}', '${avatar}', '${cover_picture}', '${facade_photo}', '1', '${sunday.open_time}', '${sunday.close_time}', '${rush_hour}', '${create_at}', '${update_at}')
        `
        try {   
            
            await host.execute(sql_Update_1)
            await host.execute(sql_Update_2)
            await host.execute(sql_Update_3)
            await host.execute(sql_Update_4)
            await host.execute(sql_Update_5)
            await host.execute(sql_Update_6)
            const [result, _] = await host.execute(sql_Update_7)
            console.log(result)

            // Update cuisine categorry id 

            for(var i = 0; i < cuisine_category_id.length; i++){
                let sqlUpdateCuisineCategories = `
                CALL Update_CuisineCategory_Form3(${provider_id}, ${cuisine_category_id[i]})
                `
                await host.execute(sqlUpdateCuisineCategories)
            }

            // Update provider category id
            for(var i = 0; i < provider_category_id.length; i++){
                let sqlUpdateProviderCategories = `
                CALL Update_ProviderCategory_Form3(${provider_id}, ${provider_category_id[i]})
                `
                await host.execute(sqlUpdateProviderCategories)
            }


            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    // Done
    static async providerUpdate_Form4(provider_id, data){
        const {price_range, menu_image, delivery_mode, update_at} = data
        try {
            let sqlUpdate = `
            CALL ProviderUpdate_Form4(${provider_id}, ${price_range}, '${menu_image}', ${delivery_mode}, '${update_at}');
            `
            const [result, _] = await host.execute(sqlUpdate)
            console.log(result)
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }


    // Done
    static async providerUpdate_Form5(provider_id, data){
        const {id_card_number, date_of_issue, bank_beneficiary_name, bank_account_number, bank_name, bank_province, bank_branch, user_role, update_at} = data
        try {
            let sqlUpdate = `
            CALL ProviderUpdate_Form5(${provider_id}, '${id_card_number}', '${date_of_issue}', '${bank_beneficiary_name}', '${bank_account_number}', '${bank_name}', '${bank_province}', '${bank_branch}', ${user_role}, '${update_at}');
            `
            const [result, _] = await host.execute(sqlUpdate)
            console.log(result)
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    // Done
    static async providerUpdate_Form0(data){
        const {user_id, registered_at, provider_update_at} = data
        try {
            let sqlUpdate = `
            CALL ProviderUpdate_Form0(${user_id}, '${registered_at}', '${provider_update_at}');
            `
            await host.execute(sqlUpdate)
            const [result, _] = await host.execute(`SELECT * FROM provider where user_id = ${user_id}`)
            console.log(result)
            return result
        } catch (error) {
            console.log(error)
            return null
        }
    }

    // Done
    static async getProviderInfo(provider_id){
        try {
            let sqlGetProviderInfo = `SELECT * FROM Tastie.Provider where provider_id = ${provider_id};`
            const [provider_info, _]  = await host.execute(sqlGetProviderInfo)
            const data = provider_info[0]
            const operation_time = await this.getOperationsTime(provider_id)
            const response = {
                data,
                operation_time
            }
            return response
        } catch (error) {
            console.log(error)
            return null
        }
    }

    // Done
    static async updateProvider (provider_id, data){
        try {
            const {provider_status, day, open_time, close_time, estimated_cooking_time, update_at} = data
            let sqlUpdateProvider = `CALL UpdateProvider(${provider_id}, ${provider_status}, '${day}', '${open_time}', '${close_time}', '${estimated_cooking_time}', '${update_at}')`
            await host.execute(sqlUpdateProvider)

            

            let sqlGetOperation = `SELECT * FROM Tastie.Operation where provider_id = ${provider_id};`

            const [opetations, _] = await host.execute(sqlGetOperation)
           
            var monday = {}, tuesday = {}, wednesday = {}, thursday = {}, friday = {}, saturday = {}, sunday = {}

            for(var i = 0; i < opetations.length; i++){
                if(opetations[i]['day'] === '2')
                {
                    monday = {
                        is_day_off: opetations[i]['open_time'] !== '00:00:00' ? true : false,
                        open_time: opetations[i]['open_time'],
                        close_time: opetations[i]['close_time']
                    }
                }
                if(opetations[i]['day'] === '3')
                {
                    tuesday = {
                        is_day_off: opetations[i]['open_time'] !== '00:00:00' ? true : false,
                        open_time: opetations[i]['open_time'],
                        close_time: opetations[i]['close_time']
                    }
                }
                if(opetations[i]['day'] === '4')
                {
                    wednesday = {
                        is_day_off: opetations[i]['open_time'] !== '00:00:00' ? true : false,
                        open_time: opetations[i]['open_time'],
                        close_time: opetations[i]['close_time']
                    }
                }
                if(opetations[i]['day'] === '5')
                {
                    thursday = {
                        is_day_off: opetations[i]['open_time'] !== '00:00:00' ? true : false,
                        open_time: opetations[i]['open_time'],
                        close_time: opetations[i]['close_time']
                    }
                }
                if(opetations[i]['day'] === '6')
                {
                    friday = {
                        is_day_off: opetations[i]['open_time'] !== '00:00:00' ? true : false,
                        open_time: opetations[i]['open_time'],
                        close_time: opetations[i]['close_time']
                    }
                }
                if(opetations[i]['day'] === '7')
                {
                    saturday = {
                        is_day_off: opetations[i]['open_time'] !== '00:00:00' ? true : false,
                        open_time: opetations[i]['open_time'],
                        close_time: opetations[i]['close_time']
                    }
                }
                if(opetations[i]['day'] === '1')
                {
                    sunday = {
                        is_day_off: opetations[i]['open_time'] !== '00:00:00' ? true : false,
                        open_time: opetations[i]['open_time'],
                        close_time: opetations[i]['close_time']
                    }
                }
            }


            const resp = {
                status : true,
                response : {
                    provider_status,
                    update_at,
                    operation_time : {
                        monday,
                        tuesday,
                        wednesday,
                        thursday,
                        friday,
                        saturday,
                        sunday
                    },
                    estimated_cooking_time
                }
            }

            return  resp

        } catch (error) {
            console.log(error)
            return {
                status : false,
                response : null
            }
        }
    }

    // 10.763019107348029, 106.68250448518744
    // Done
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

    // Done
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


    // Done
    static async getNearByProvider(data){

        const {limit, offset, longitude, latitude} = data

        try {
            
            let sqlGetProvider = `SELECT * FROM Tastie.Provider;`
            const [list_provider, _] = await host.execute(sqlGetProvider)
          
            var _list_provider = [];

            //10.763019107348029 106.68250448518744

            // <= 3 : 15k, >3 <=4 18, >4, <=5 20k, >=5, dis-5 = a, a/1000k = le? x 2500
           
            for(var i = 0 ; i < list_provider.length; i++){
                var distance = Geolib.getDistance({
                    latitude: latitude, longitude: longitude
                },{ latitude: parseFloat(list_provider[i]['latitude']), longitude: parseFloat(list_provider[i]['longitude'])})


              

                if(distance <= 15000){
                    
                    var index_estimated_space = list_provider[i]['estimated_cooking_time'].indexOf(" ")

                    var convert_estimated = list_provider[i]['estimated_cooking_time'].slice(0, index_estimated_space).split("-")
              
                    var convert_time = new Date(list_provider[i]['registered_at']).toLocaleString()

                    var delivery_fee = this.delivery_fee(distance)

                    var operation_time = await this.getOperationsTime(list_provider[i]['provider_id'])

                    var newData = {
                        distance,
                        delivery_fee,
                        provider_id : list_provider[i]['provider_id'],
                        provider_name: list_provider[i]['merchant_name'],
                        latitude: list_provider[i]['latitude'], 
                        longitude: list_provider[i]['longitude'],
                        address: list_provider[i]['address'],
                        price_range: list_provider[i]['price_range'],
                        estimated_cooking_time: list_provider[i]['estimated_cooking_time'],
                        profile_pic: list_provider[i]['avatar'],
                        has_promo: true,
                        customer_rating: list_provider[i]['rating'],
                        order_totals : list_provider[i]['order_totals'],
                        mean_estimated_cooking_time :(parseInt(convert_estimated[0]) + parseInt(convert_estimated[1])) / 2,
                        registered_at :  convert_time,
                        operation_time
                    
                    }
                    _list_provider.push(newData)
                }
                
            }

            _list_provider.sort((provider_one, provider_two) => { 
                
                if(provider_one.distance > provider_two.distance)
                {
                    return 1
                }
                if(provider_one.distance < provider_two.distance)
                {
                    return -1
                }
                return 0

            })

           // console.log(_list_provider)

            return _list_provider.slice( offset - 1  === 0 ? offset-1 : limit*(offset-1), offset*limit <= _list_provider.length ? offset*limit : offset*limit-1)

        } catch (error) {
            console.log(error)
            return null
        }
    }

    // Done
    static async getGroupProvider(data){
        try {
            
            const {group_provider_id, limit, offset, longitude, latitude} = data
            
            let sqlGetProvider = `SELECT * FROM Tastie.Provider;`
            const [list_provider, _] = await host.execute(sqlGetProvider)

            

            var response = []

            for(var i = 0; i < list_provider.length; i++){
                var distance = Geolib.getDistance({
                    latitude: latitude, longitude: longitude
                },{ latitude: parseFloat(list_provider[i]['latitude']), longitude: parseFloat(list_provider[i]['longitude'])})



                if(distance <= 15000){

                    // Find maximum estimated_cooking_time

                    
                    var index_estimated_space = list_provider[i]['estimated_cooking_time'].indexOf(" ")

                    var convert_estimated = list_provider[i]['estimated_cooking_time'].slice(0, index_estimated_space).split("-")
              
                    var convert_time = new Date(list_provider[i]['registered_at']).toLocaleString()

                    var delivery_fee = this.delivery_fee(distance)
                    

                    var operation_time = await this.getOperationsTime(list_provider[i]['provider_id'])

                    var newData = {
                        distance,
                        delivery_fee,
                        provider_id : list_provider[i]['provider_id'],
                        provider_name: list_provider[i]['merchant_name'],
                        latitude: list_provider[i]['latitude'], 
                        longitude: list_provider[i]['longitude'],
                        address: list_provider[i]['address'],
                        price_range: list_provider[i]['price_range'],
                        estimated_cooking_time: list_provider[i]['estimated_cooking_time'],
                        profile_pic: list_provider[i]['avatar'],
                        has_promo: true,
                        customer_rating: list_provider[i]['rating'],
                        order_totals : list_provider[i]['order_totals'],
                        mean_estimated_cooking_time :(parseInt(convert_estimated[0]) + parseInt(convert_estimated[1])) / 2,
                        registered_at :  convert_time,
                        operation_time
                    
                    }
                    response.push(newData)
                }


                
            }

                //group_provider_id = 1 :  order near u
                if(group_provider_id === 1){
                    response.sort((provider_one, provider_two) => { 
                
                        if(provider_one.distance > provider_two.distance)
                        {
                            return 1
                        }
                        if(provider_one.distance < provider_two.distance)
                        {
                            return -1
                        }
                        return 0
        
                    })
                }


                //group_provider_id = 2 : today_offer
                if(group_provider_id === 2){
                    // lay nhung thang provider co promos
                  
                    const list_provider_id = await host.execute(`CALL Get_Today_Offer_Provider_List();`) 
                    const _list_provider_id = list_provider_id[0][0]
                    response = response.filter((provider)  => {
                        
                        var index = _list_provider_id.findIndex((p) => {
                            if(provider['provider_id'] === p['provider_id'])
                                return true
                            else
                                return false
                        })
                        return index >= 0
                    })
                }

                //group_provider_id = 3 :  rating
                if(group_provider_id === 3){
                
                response.sort((provider_one, provider_two) => { 
                    
                   
                    
                    if(provider_one.customer_rating < provider_two.customer_rating)
                    {
                        return 1
                    }
                    if(provider_one.customer_rating > provider_two.customer_rating)
                    {
                        return -1
                    }
                    return 0
    
                })
            }

            //group_provider_id = 4 :  delively fee
            if(group_provider_id === 4){
                
                response.sort((provider_one, provider_two) => { 
                    
                   
                    
                    if(provider_one.delivery_fee > provider_two.delivery_fee)
                    {
                        return 1
                    }
                    if(provider_one.delivery_fee < provider_two.delivery_fee)
                    {
                        return -1
                    }
                    return 0
    
                })
            }
            
            //group_provider_id = 5 :  new on tastie
            if(group_provider_id === 5){
                
                response.sort((provider_one, provider_two) => { 
                    
                    let new_time_1 = new Date(provider_one.registered_at).valueOf()
                    let new_time_2 = new Date(provider_two.registered_at).valueOf()
                    
                    if(new_time_1 > new_time_2)
                    {
                        return 1
                    }
                    if(new_time_1 < new_time_2)
                    {
                        return -1
                    }
                    return 0
    
                })
            }
            

            // group_provider_id = 6 : order_totals

            if(group_provider_id === 6 ){
                response.sort((provider_one, provider_two) => { 
                
                    if(provider_one.order_totals > provider_two.order_totals)
                    {
                        return -1
                    }
                    if(provider_one.order_totals < provider_two.order_totals)
                    {
                        return 1
                    }
                    return 0
    
                })
            }

            // group_provider_id = 7 : mean_estimated_cooking_time

            if(group_provider_id === 7){
                response.sort((provider_one, provider_two) => { 
                
                    if(provider_one.mean_estimated_cooking_time > provider_two.mean_estimated_cooking_time)
                    {
                        return 1
                    }
                    if(provider_one.mean_estimated_cooking_time < provider_two.mean_estimated_cooking_time)
                    {
                        return -1
                    }
                    return 0
    
                })
            }

        

            var new_respone = response.slice( offset - 1  === 0 ? offset-1 : limit*(offset-1), offset*limit <= response.length ? offset*limit : offset*limit-1)

            return new_respone
         

        } catch (error) {
            
        }
    }

    // Done
    static async AddPromotion(data){
        try {

            console.log(data)

            const {provider_id, promotion_code, promotion_name, promotion_value,
                promotion_description, min_order_value, max_discount_value, start_at,
                expire_at, payment_method_id, limited_offer, weekly_usage_limit_per_user, delivery_mode} = data
            let sqlAddPromotion = `CALL Add_Promotion(${provider_id}, 'P_${promotion_code}', '${promotion_name}', ${promotion_value}, '${promotion_description}',
            ${min_order_value}, ${max_discount_value}, '${start_at}', '${expire_at}', ${payment_method_id}, ${limited_offer}, ${weekly_usage_limit_per_user}, ${delivery_mode});`
            await host.execute(sqlAddPromotion)
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    // Done
    static async UpdatePromotion(data){
        try {
            const {promotion_id, provider_id, promotion_code, promotion_name, promotion_value,
                promotion_description, min_order_value, max_discount_value, start_at,
                expire_at, payment_method_id, limited_offer, weekly_usage_limit_per_user, delivery_mode, update_at} = data
            let sqlUpdatePromotion = `CALL Update_Promotion(${promotion_id}, ${provider_id}, '${promotion_code}', '${promotion_name}', ${promotion_value}, '${promotion_description}',
            ${min_order_value}, ${max_discount_value}, '${start_at}', '${expire_at}', ${payment_method_id}, ${limited_offer}, ${weekly_usage_limit_per_user}, ${delivery_mode}, '${update_at}');`
            await host.execute(sqlUpdatePromotion)
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    // Done
    static async getAllOrder(data){
        try {

            const {limit, offset, provider_id} = data
                let sqlGetAllOrder = `CALL Get_List_Order_By_Provider(${provider_id});`
                const [result, _] = await host.execute(sqlGetAllOrder)

                const _list_order = result[0]

                return _list_order.slice( offset - 1  === 0 ? offset-1 : limit*(offset-1), offset*limit <= _list_order.length ? offset*limit : offset*limit-1)

            
        } catch (error) {
            console.log(error)
            return []
        }
    }

    // Done
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

    // Done
    static async registerEcoupon(data){
        try {
            const {ecoupon_id, provider_id} = data
            await host.execute(`CALL Provider_Register_Ecoupon(${ecoupon_id}, ${provider_id});`)
            return true
        } catch (error) {
            return false
        }
    }

}


module.exports = MerchantModel