const UserAction = require("../models/UserAction")
const UserModel = require("../models/usermodel");
const user = require('../models/userTest')
const jwt = require('jsonwebtoken');
const { encoded_Data, decoded_Data } = require("../constant/hash");
const bcrypt = require('bcrypt');
const messageBird = require('messagebird')('YqFwMJdzEIudazqJNAMOHXRGg');

class requestControllers{

    static async checkExistEmailAndPhone(req, res) {
        const {email, phone} = req.body;
        console.log(email)
        try {
            var [result_email, _] = await UserModel.findUserByEmail(email)
            var [result_phone, _] = await UserModel.findUserByPhone(phone)
            
                return res.status(200).json({
                    
                        isPhoneDuplicated: result_phone.length > 0 ? true : false,
                        isEmailDuplicated: result_email.length > 0 ? true : false,
                        first_name : result_phone.length > 0 ? result_phone[0]['first_name'] : (result_email.length > 0 ? result_email[0]['first_name'] : null),
                        email_of_param_phone : result_phone.length ? result_phone[0]['email'] : null,
                        phone_of_param_email : result_email.length ? result_email[0]['phone'] : null
             
            })
                   
            
        } catch (error) {
            console.log(error)
            return res.status(200).json({
                isPhoneDuplicated:  false,
                isEmailDuplicated:  false,
                first_name : null,
                email_of_param_phone : null,
                phone_of_param_email : null    
         
             })
        }
        

    }


    static sendCodeToVerifyEmail = async (req, res) => {
        const {email} = req.body;

        try {
            const result = await UserAction.sendEmailToVerify(email)
           
            if(result['code'] !== null){


            //    var decode = await jwt.verify(result['verifyEmailToken'], result['code'])
            //    console.log(result['verifyEmailToken'])
             
              
              
                res.status(200).json({
                    status: true,
                    result
                })
            }
            else{
                res.status(404).json({
                    status : false
                })
            }
        } catch (error) {
            console.log(error)
            res.status(404).json({
                status : false
            })
        }
    }


    static verifyEmail = (req, res) => {
        try {
            const {verifyEmailToken, code, email} = req.body
            var decode =  jwt.verify(verifyEmailToken, code)
            console.log(decode)
            if(decode['email'] === email){
                res.status(200).json({
                    status : true
                })
            }
            else{
                res.status(401).json({
                    status : false
                })
            }
        } catch (error) {
            console.log(error)
            res.status(401).json({
                status : false
            })
        }
    }


    static getListReview = async (req, res) => {
        try {
            
            const provider_id = req.params.provider_id
            const response = await UserAction.getListReview(provider_id)

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

    static getCartDetail = async (req, res) => {
        try {
            
            const user_id = req.params.user_id
            const response = await UserAction.getCartDetail(user_id)

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

    static insertCartDetail = async (req, res) => {
        try {
            
            
            const item_code = await UserAction.insertProductIntoCart(req.body)

            res.status(200).json({
                status : true,
                item_code
            })

        } catch (error) {
            console.log(error)
            res.status(404).json({
                status : false,
                item_code : null
            })
        }
    }


    static updateQuantityAndNoteIntoCartDetail = async (req, res) => {
        try {
            
            
            const response = await UserAction.updateQuantityAndNoteIntoCartDetail(req.body)

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


    static updateValueOfLabel = async (req, res) => {
        try {
            
            
            const response = await UserAction.updateValueOfLabel(req.body)

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

    static updateLabelOfProduct = async (req, res) => {
        try {
            
            
            const response = await UserAction.updateLabelOfProduct(req.body)

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


    static deleteCartDetail = async (req, res) => {
        try {
            
            
            const response = await UserAction.deleteCartDetail(req.body)

            res.status(200).json({
                status : response
            })

        } catch (error) {
            console.log(error)
            res.status(404).json({
                status : false
            })
        }
    }

    static DeliveryFeeToCheckOut = async (req, res) => {
        try {
            
            
            const response = await UserAction.DeliveryFeeToCheckOut(req.body)

            res.status(200).json({
                delivery_fee : response
            })

        } catch (error) {
            console.log(error)
            res.status(404).json({
                status : false
            })
        }
    }

    static SearchBar= async (req, res) => {
        try {
            console.log(req.query)
            const data = await UserAction.SearchBar(req.body)

            res.status(200).json({
                status : true,
                data
            })

        } catch (error) {
            console.log(error)
            res.status(404).json({
                status : true,
                data : null
            })
        }
    }


    static getCustomerAdress = async ( req, res) => {
        try {
            
            const user_id = req.params.user_id
            const response = await UserAction.getCustomerAdress(user_id)

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

    static getScheduleOperation = async ( req, res) => {
        try {
            
            const provider_id = req.params.provider_id
            const response = await UserAction.getSchedule_Operation(provider_id)

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
    
    static getAllCategory = async ( req, res) => {
        try {
            
          
            const response = await UserAction.getAllCategory()
           
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


    
}

module.exports = requestControllers