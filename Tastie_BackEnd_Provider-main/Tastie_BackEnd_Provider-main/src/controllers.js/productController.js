const ProductModel = require("../models.js/productModel")






class ProductController{


    static addProduct = async (req, res) => {
        try {
            if(req.body && req.body.provider_id){
                const result = await ProductModel.addProduct(req.body)

                res.status(200).json({
                    status : true,
                    infor : result
                })
            }
            else{
                res.status(200).json({
                    status : false,
                    infor : null
                })
            }
            
            
        } catch (error) {
            console.log(error)
            res.status(404).json({
                status : false,
                infor : null
            })
        }
    }


    static getMenuItems = async (req, res) => {

        try {
            const provider_id = req.params.id

            const result = await ProductModel.getMenuItems(provider_id)
            if(result){
                res.status(200).json({
                    status : true,
                    menuItems : result[0],
                    message : "Successfully retrieved menu item"

                })
            }
            else{
                res.status(200).json({
                    status : false,
                    menuItems : null,
                    message : "The menu iteam is empty"
                })
            }
            
            
        } catch (error) {
            console.log(error)
            res.status(404).json({
                status : false,
                menuItems : null,
                message : "Get the menu item has an error"
            })
        }
    }


    static updateProduct = async (req, res) => {
        try {
            const provider_id = req.params.id

            const result = await ProductModel.updateProduct(provider_id, req.body)

            res.status(200).json({
                status : result,
                
            })
            
        } catch (error) {
            console.log(error)
            res.status(404).json({
                status : false,
               
            })
        }
    }

    static getListProduct = async (req, res) => {
        try {
            const provider_id = req.params.id

            const result = await ProductModel.getListProduct(provider_id)

            res.status(200).json({
                status : true,
                result
                
            })
            
        } catch (error) {
            console.log(error)
            res.status(404).json({
                status : false,
                result : null
            })
        }
    }

    static removeProduct = async (req, res) => {
        try {
            const product_id = req.params.product_id

            const statusRemove = await ProductModel.removeProduct(product_id)

            res.status(200).json({
                status : statusRemove 
                
            })
            
        } catch (error) {
            console.log(error)
            res.status(404).json({
                status : false
            })
        }
    }

    static addMenuCategory = async (req, res) => {
        try {
            const provider_id = req.params.id
            const {menu_name} = req.body
            const status = await ProductModel.addMenuCategory(provider_id, menu_name)
            res.status(200).json({
                status
            })
        } catch (error) {
            console.log(error)
            res.status(404).json({
                status : false
            })
        }
    }

    static addProductIntoMenuCategory = async (req, res) => {
        try {
            const provider_id = req.params.id
           
            const status = await ProductModel.addProductIntoMenuCategory(provider_id, req.body)
            res.status(200).json({
                status
            })
        } catch (error) {
            console.log(error)
            res.status(404).json({
                status : false
            })
        }
    }

    static updateProductStatus = async (req, res) => {
        try {
            const provider_id = req.params.provider_id
           
            const status = await ProductModel.updateProductStatus(provider_id, req.body)
            res.status(200).json({
                status,
                product_status : req.body.product_status
            })
        } catch (error) {
            console.log(error)
            res.status(404).json({
                status : false
            })
        }
    }


}




module.exports = ProductController