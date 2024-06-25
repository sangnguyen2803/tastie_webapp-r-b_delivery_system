

const host = require('../../config/connectMySQL')




class ProductModel{

    // Done
    static async addProduct(data){
        try {
            const { provider_id, product_name, product_status, description, price, quantity, product_image, create_at, update_at, menuCategoryID, foodCategoryID, mainCategoryID, additionalOptions} = data
            let sqlAddProduct = `CALL AddProduct( ${provider_id}, N'${product_name}', ${product_status}, N'${description}', ${price}, ${quantity}, '${create_at}', '${update_at}'); `

            await host.execute(sqlAddProduct)

            let sqlSelectProductID = `SELECT * FROM Tastie.Product Where provider_id = ${provider_id} and product_name = '${product_name}' and product_status = ${product_status} and description = '${description}' and price = ${price} and quantity = ${quantity} and update_at = '${update_at}';`

            const [productInfo, _] = await host.execute(sqlSelectProductID)

            console.log(productInfo)

            // Update Main Category

            for(var i = 0; i < mainCategoryID.length; i++){
                let sqlUpdateMainCategory = `CALL Update_Product_Main_Category(${provider_id}, ${productInfo[0]['product_id']}, ${mainCategoryID[i]});`

                await host.execute(sqlUpdateMainCategory)

            }

            // Update Product Category

            for(var i = 0; i < foodCategoryID.length; i++){
                let sqlUpdateProductCategory = `CALL Update_Product_Category(${provider_id}, ${productInfo[0]['product_id']}, ${foodCategoryID[i]});`

                await host.execute(sqlUpdateProductCategory)

            }

            // Update Product Menu Category

            for(var i = 0; i < menuCategoryID.length; i++){
                let sqlUpdateProductMenuCategory = `CALL Update_Product_Menu_Category(${provider_id}, ${productInfo[0]['product_id']}, ${menuCategoryID[i]});`

                await host.execute(sqlUpdateProductMenuCategory)

            }

            // Update_Product_Option 
            for(var i = 0; i < additionalOptions.length; i++){
                
                for(var j = 0; j < additionalOptions[i]['optionList'].length; j++){
                    let sqlAddProductOption = `CALL Add_Product_Option(${provider_id}, ${productInfo[0]['product_id']}, '${additionalOptions[i]['name']}', '${additionalOptions[i]['optionList'][j]['optionName']}', ${additionalOptions[i]['optionList'][j]['addtionalPrice']}, '${additionalOptions[i]['option_description']}', '${additionalOptions[i]['is_required']}');`

                    await host.execute(sqlAddProductOption)
                

                }

            }

            return productInfo[0]

        } catch (error) {
            console.log(error)
            return null
        }
    }

    // Done
    static async getMenuItems(provider_id){
        try {
            let sqlGetMenuItems = `CALL GetMenuItems(${provider_id});`
            const [result, _] = await host.execute(sqlGetMenuItems)

            return result
        } catch (error) {
            console.log(error)
            return null
        }
    }

    // Done
    static async updateProduct(provider_id, data){
        const {productId, productName, description, menuCategoryID, foodCategoryID, 
            additionalOptions, productPhoto, productPrice, quantityAvailable, productStatus, position, update_at, mainCategoryID} = data

        try {
            
            // Update Product

            let sqlUpdateProduct = `CALL UpdateProduct(${provider_id}, ${productId}, N'${productName}', ${productStatus}, N'${description}', ${productPrice}, '${productPhoto}', ${quantityAvailable}, '${update_at}');`

            await host.execute(sqlUpdateProduct)


             // Update Main Category

             for(var i = 0; i < mainCategoryID.length; i++){
                let sqlUpdateMainCategory = `CALL Update_Product_Main_Category(${provider_id}, ${productId}, ${mainCategoryID[i]});`

                await host.execute(sqlUpdateMainCategory)

            }

            // Update Product Category

            for(var i = 0; i < foodCategoryID.length; i++){
                let sqlUpdateProductCategory = `CALL Update_Product_Category(${provider_id}, ${productId}, ${foodCategoryID[i]});`

                await host.execute(sqlUpdateProductCategory)

            }

            // Update Product Menu Category

            for(var i = 0; i < menuCategoryID.length; i++){
                let sqlUpdateProductMenuCategory = `CALL Update_Product_Menu_Category(${provider_id}, ${productId}, ${menuCategoryID[i]});`

                await host.execute(sqlUpdateProductMenuCategory)

            }

            // Update_Product_Option 
            for(var i = 0; i < additionalOptions.length; i++){
                
                for(var j = 0; j < additionalOptions[i]['optionList'].length; j++){
                    let sqlAddProductOption = `CALL Add_Product_Option(${provider_id}, ${productId}, '${additionalOptions[i]['name']}', '${additionalOptions[i]['optionList'][j]['optionName']}', ${additionalOptions[i]['optionList'][j]['addtionalPrice']}, '${additionalOptions[i]['option_description']}', '${additionalOptions[i]['is_required']}');`

                    await host.execute(sqlAddProductOption)
                

                }

            }

            return true
            

        } catch (error) {

            console.log(error)

            return false
            
        }
    }

    // Done
    static async getListProduct(provider_id){
        try {
            let sqlGetListProduct = `CALL get_list_product(${provider_id});`

            const [result, _] = await host.execute(sqlGetListProduct)


            const convertResult = []
            

            for(var i = 0; i < result[0].length; i++){

                var objProduct = result[0][i]
                
                var index = convertResult.findIndex((product) => {
                    if(product['menu_category_id'] === objProduct['menu_id'])
                        return true
                    else
                        return false
                })

                console.log(index + " = " + objProduct['menu_id'])

                if(index < 0 && objProduct['menu_id']){
                    var convertProduct = {
                        menu_category_id : objProduct['menu_id'],
                        menu_category_name : objProduct['menu_name'],
                        menu_category_position : objProduct['menu_position'],
                        products : [
                            {
                                product_id : objProduct['product_id'],
                                product_name: objProduct['product_name'],
                                product_status : objProduct['product_status'],
                                product_image : objProduct['product_image'],
                                description : objProduct['description'],
                                main_food_category_id: objProduct['main_food_category_id'],
                                food_category_id : objProduct['food_category_id'],
                                menu_category_id : objProduct['menu_id'],
                                price : objProduct['price'] ? objProduct['price'] : 0,
                                quantity : objProduct['quantity'],
                                product_position : objProduct['position'],
                                create_at : objProduct['create_at'],
                                update_at : objProduct['update_at'],
                                product_options : [
                                    {
                                        option_name : objProduct['label'],
                                        option_description : objProduct['option_description'],
                                        is_required : objProduct['Option_Required'],
                                        options : [
                                            {
                                                
                                                value : objProduct['value'],
                                                price : objProduct['ProductOptionPrice'] ? objProduct['ProductOptionPrice'] : 0,
                                                
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }

                    

                    convertResult.push(convertProduct)
                }
                else{
                    if(objProduct['menu_id']){
                        var index_product = convertResult[index]['products'].findIndex((p) => {
                            if(p['product_id'] === objProduct['product_id'])
                                return true
                            else
                                return false
                        })
                        if(index_product < 0){
                            var newProduct = {
                                product_id : objProduct['product_id'],
                                product_name: objProduct['product_name'],
                                product_status : objProduct['product_status'],
                                product_image : objProduct['product_image'],
                                description : objProduct['description'],
                                main_food_category_id: objProduct['main_food_category_id'],
                                food_category_id : objProduct['food_category_id'],
                                menu_category_id : objProduct['menu_id'],
                                price : objProduct['price'] ? objProduct['price'] : 0,
                                quantity : objProduct['quantity'],
                                product_position : objProduct['position'],
                                create_at : objProduct['create_at'],
                                update_at : objProduct['update_at'],
                                product_options : [
                                    {
                                        option_name : objProduct['label'],
                                        option_description : objProduct['option_description'],
                                        is_required : objProduct['Option_Required'],
                                        options : [
                                            {
                                                
                                                value : objProduct['value'],
                                                price : objProduct['ProductOptionPrice'] ? objProduct['ProductOptionPrice'] : 0
                                                
                                            }
                                        ]
                                    }
                                ]
                            }
                            convertResult[index]['products'].push(newProduct)
                        }
                        else{
                            var index_product_option = convertResult[index]['products'][index_product]['product_options'].findIndex((op) => {
                                if(op['option_name'] === objProduct['label']) // objProduct['option_name']
                                    return true
                                else
                                    return false
                            })
                            if(index_product_option < 0){
                                var newProductOption = {
                                    option_name : objProduct['label'],
                                    option_description : objProduct['option_description'],
                                    is_required : objProduct['Option_Required'],
                                        options : [
                                            {
                                               
                                                value : objProduct['value'],
                                                price : objProduct['ProductOptionPrice'] ? objProduct['ProductOptionPrice'] : 0
                                                
                                            }
                                        ]
                                }
                                convertResult[index]['products'][index_product]['product_options'].push(newProductOption)
                            }
                            else{
                                var newOption = {
                                    
                                        
                                        value : objProduct['value'],
                                        price : objProduct['ProductOptionPrice'] ? objProduct['ProductOptionPrice'] : 0,
                                        
                                    
                                }
                            
                                convertResult[index]['products'][index_product]['product_options'][index_product_option]['options'].push(newOption)
                            }
                        }
                        
                    }
                    
                }

            }

            

            return convertResult

        } catch (error) {
            console.log(error)
            return null
        }
    }

    // Done
    static async removeProduct(product_id){
        try {
            let sqlRemove = `CALL Remove_Product(${product_id});`
            await host.execute(sqlRemove)
            return true
        } catch (error) 
        {
            console.log(error)
            return false
        }
    }

    // Done
    static async addMenuCategory(provider_id, menu_name){
        try {
            let sqlAddMenuCategory = `CALL Add_Menu_Category(${provider_id}, '${menu_name}');`
            await host.execute(sqlAddMenuCategory)
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    // Done
    static async addProductIntoMenuCategory(provider_id, data){
        try {
            const {menu_category_id, product_id} = data
            if(product_id.length > 0){
                for(var i = 0; i < product_id.length; i++){
                    let sqlAddProductIntoMenuCategory = `CALL Add_Product_Into_Menu(${provider_id},${product_id[i]},${menu_category_id});`
                    await host.execute(sqlAddProductIntoMenuCategory)
                }
                
            }

            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    // Done
    static async updateProductStatus(provider_id, data){
        try {
            const {product_id, product_status, update_at} = data
            let sqlUpdateProductStatus = `CALL UpdateProductStatus(${provider_id}, ${product_id}, ${product_status}, '${update_at}');`
               
                await host.execute(sqlUpdateProductStatus)
                
             
            if(product_status === 1){
               
                let sqlUpdateProductQuantity = `UPDATE Product SET quantity = 0 WHERE product_id = ${product_id}`
              
                await host.execute(sqlUpdateProductQuantity)
              
            }
            return true
        } catch (error) {
            
            console.log(error)
            return false
        }
    }

    // Done
    static async addUpComingProduct(data){
        try {
            const {provider_id, product_name, product_description, estimated_price, product_image} = data
            let sqlAddUpComingProduct = `CALL Add_Upcoming_Product(${provider_id}, '${product_name}', '${product_description}', ${estimated_price}, '${product_image}');`
            await host.execute(sqlAddUpComingProduct)
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    //Done
    static async updateUpComingProduct(data){
        try {
            const {upcoming_product_id, provider_id, product_name, product_description, estimated_price, product_image, update_at} = data
            let sqlUpdateUpComingProduct = `CALL Add_Upcoming_Product(${upcoming_product_id}, ${provider_id}, '${product_name}', '${product_description}', ${estimated_price}, '${product_image}', '${update_at}');`
            await host.execute(sqlUpdateUpComingProduct)
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }


    static async addSurveyQuestion(data){
        try {
            const {provider_id, upcoming_product_id, question, start_at, expire_at} = data
            let sqlAddSurveyQuestion = `CALL Add_Survey_Question(${provider_id}, ${upcoming_product_id}, '${question}', '${start_at}', '${expire_at}');`

            await host.execute(sqlAddSurveyQuestion)
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }


    static async addSurveyChoices(data){
        try {
            const {survey_id, choice} = data
            let sqlAddSurveyChoices = `CALL Add_Survey_Choices(${survey_id}, '${choice}')`
            await host.execute(sqlAddSurveyChoices)

            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }


  


}


module.exports = ProductModel