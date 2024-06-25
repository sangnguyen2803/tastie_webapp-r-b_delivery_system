const UserAction = require("../models/UserAction")
const UserModel = require("../models/usermodel");
const user = require('../models/userTest')
const jwt = require('jsonwebtoken');
const { encoded_Data, decoded_Data } = require("../constant/hash");
const bcrypt = require('bcrypt');
const OrderModel = require("../models/order");
const NotificationModels = require("../models/notification");
const messageBird = require('messagebird')('YqFwMJdzEIudazqJNAMOHXRGg');



class OrderController{
    static getAllPromotion = async (req, res) => {
        
        try {
            const provider_id = req.params.provider_id
            const response = await OrderModel.getAllPromotions(provider_id)
            res.status(200).json({
                status : true,
                response
            })

        } catch (error) {
            console.log(error)
            res.status(404).json({
                status : false,
                response : null
            })
        }
    }



    static submitOrder = async ( req, res) => {
        try {
              
            const order_code = await OrderModel.submitOrder(req.body)
        
            res.status(200).json({
                status : true,
                order_code
            })

        } catch (error) {
            console.log(error)
            res.status(404).json({
                status : false,
                order_code : ""
            })
        }
    }


    static submitOrderPickup = async ( req, res) => {
        try {
              
            const order_code = await OrderModel.submitOrderPickup(req.body)
        
            res.status(200).json({
                status : true,
                order_code
            })

        } catch (error) {
            console.log(error)
            res.status(404).json({
                status : false,
                order_code : ""
            })
        }
    }

    static submitOrderItems = async ( req, res) => {
        try {
              
            const status = await OrderModel.submitOrderItems(req.body)
        
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


    static  getOrderDetail = async (req, res) => {
        try {
            const order_code = req.params.order_code
            const response = await OrderModel.getOrderDetail(order_code)
            res.status(200).json({
                status : true,
                response
            })

        } catch (error) {
            console.log(error)
            res.status(404).json({
                status : false,
                response : null
            })
        }
    }

    static  getOrderSummary = async (req, res) => {
        try {
            const order_code = req.params.order_code
            const response = await OrderModel.getOrderSummary(order_code)
            res.status(200).json({
                status : true,
                response
            })

        } catch (error) {
            console.log(error)
            res.status(404).json({
                status : false,
                response : null
            })
        }
    }

    static  getOrderHistory = async (req, res) => {
        try {
            const customer_id = req.params.customer_id
            const response = await OrderModel.getOrderHistory(customer_id)
            res.status(200).json({
                status : true,
                response
            })

        } catch (error) {
            console.log(error)
            res.status(404).json({
                status : false,
                response : null
            })
        }
    }

    static  getShipperInfo = async (req, res) => {
        try {
            const shipper_id = req.params.shipper_id
            const response = await OrderModel.getShipperInfo(shipper_id)
            res.status(200).json({
                status : true,
                response
            })

        } catch (error) {
            console.log(error)
            res.status(404).json({
                status : false,
                response : null
            })
        }
    }

    static updateOrderStatus = async ( req, res) => {
        try {
              
            const status = await OrderModel.updateOrderStatus(req.body)
        
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

    static clearCart = async ( req, res) => {
        try {
            const customer_id = req.params.customer_id
            const status = await OrderModel.clearCart(customer_id)
        
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

    static getPromsMoney = async ( req, res) => {
        try {
            
            const promos_value = await OrderModel.getPromotionMoney(req.body)
            console.log(promos_value)
            res.status(200).json({
                status : true,
                promos_value
            })

        } catch (error) {
            console.log(error)
            res.status(404).json({
                status : false,
                promos_value : null
            })
        }
    }

    static getPromsDetail = async ( req, res) => {
        try {
            
            const promos_code = req.params.promos_code
            const promos_detail = await OrderModel.getPromos(promos_code)
          
            res.status(200).json({
                status : true,
                promos_detail
            })

        } catch (error) {
            console.log(error)
            res.status(404).json({
                status : false,
                promos_detail : null
            })
        }
    }


    static addOrderReview = async ( req, res) => {
        try {
            
            const status = await OrderModel.addOrderReview(req.body)
        
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

    static addShipperReview = async ( req, res) => {
        try {
            
            const status = await OrderModel.addShipperReview(req.body)
        
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

    
    static updatePaymentStatus = async ( req, res) => {
        try {
            
            const status = await OrderModel.updatePaymentStatus(req.body)
        
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

    static addNotifi = async ( req, res) => {
        try {
              
            const status = await NotificationModels.addNotification(req.body)
        
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


    static getNotifi = async ( req, res) => {
        try {
            
            const user_id = req.params.user_id
            const response = await NotificationModels.getNotification(user_id)
          
            res.status(200).json({
                status : true,
                response
            })

        } catch (error) {
            console.log(error)
            res.status(404).json({
                status : false,
                response : []
            })
        }
    }

    
}


module.exports = OrderController