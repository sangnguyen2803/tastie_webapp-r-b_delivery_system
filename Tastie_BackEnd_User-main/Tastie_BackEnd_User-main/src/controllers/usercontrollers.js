require("dotenv").config();

const user = require('../models/userTest')
const jwt = require('jsonwebtoken');
const UserModel = require("../models/usermodel");

const { encoded_Data, decoded_Data } = require("../constant/hash");
const bcrypt = require('bcrypt');
const UserAction = require("../models/UserAction");
const messageBird = require('messagebird')('YqFwMJdzEIudazqJNAMOHXRGg');

class UserControllers{

    static async signIn(req, res){

        try {
            
            var checkValidate = await UserModel.validateLogin(req.body)
            console.log(checkValidate)
            if(!checkValidate){
                return res.json({
                    err : {
                        statusCode : 401,
                        message: "The Username or Password is Incorrect.",
                        provider_id : -1
                    },
                    loginState : false
                })
            }
            else{
                // create access token
             //   var accessToken = jwt.sign({phone:req.phone, password : req.password}, process.env.ACCESS_TOKEN_SECRET)
                if(req.body.phone){
                    var refreshToken = jwt.sign({phone:req.body.phone}, process.env.REFRESH_TOKEN_SECRET)
                    var [result, _] = await UserModel.findUserByPhone(req.body.phone)
                    console.log(result[0]['user_id'])
                    var [updateToken, _] = await UserModel.setToken(result[0]['user_id'], refreshToken)
                    const providerID = await UserAction.getProviderId(result[0]['user_id'])
                    return res.json({loginState : true, refreshToken : refreshToken, statusCode : 200, profile : result[0], provider_id : providerID.length ? providerID[0]['provider_id'] : -1})
                }
                else{
                    if(req.body.email){
                        var refreshToken = jwt.sign({email:req.body.email}, process.env.REFRESH_TOKEN_SECRET)
                        var [result, _] = await UserModel.findUserByEmail(req.body.email)
                        console.log(result[0]['user_id'])
                        var [updateToken, _] = await UserModel.setToken(result[0]['user_id'], refreshToken)
                        const providerID = await UserAction.getProviderId(result[0]['user_id'])
                        return res.json({loginState : true, refreshToken : refreshToken, statusCode : 200, profile : result[0], provider_id : providerID.length ? providerID[0]['provider_id'] : -1})
                    }
                }
                
               
            }
        } catch (error) {
            console.log(error)
            return res.json({loginState : false,err : error, statusCode : 401, provider_id : -1})
               
        }
    
    }

    static getInfo = async (req, res) => {
        const {accessToken} = req.body
        try {
            const decoded = jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET)
            if(decoded['email']){
                const [result, _] = await UserModel.findUserByEmail(decoded['email'])
                const providerID = await UserAction.getProviderId(result[0]['user_id'])
                res.status(200).json({
                    status : true,
                    profile : result[0],
                    provider_id : providerID.length ? providerID[0]['provider_id'] : -1
                })
            }
            else{
                if(decoded['phone']){
                    const [result, _] = await UserModel.findUserByPhone(decoded['phone'])
                    const providerID = await UserAction.getProviderId(result[0]['user_id'])
                    res.status(200).json({
                        status : true,
                        profile : result[0],
                        provider_id : providerID.length ? providerID[0]['provider_id'] : -1
                })
                }
                else{
                    
                res.status(401).json({
                    status : false,
                    provider_id : -1
                    })
                }
            }
        } catch (error) {
            console.log(error)
            res.status(401).json({
                status : false,
                provider_id : -1
                })
        }
        
    }


    static signUp = async (req, res) => {

   

        try {
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt);
            console.log(req.body.password.length)
            let usermodel = new UserModel(req.body);
          
            usermodel = await usermodel.registerUser()
            
            var refreshToken = jwt.sign({phone:req.body.phone}, process.env.REFRESH_TOKEN_SECRET)
            var _phone = req.body.phone
            var [result, _] = await UserModel.findUserByPhone(_phone)
    
    
            console.log(result[0]['user_id'])
    
            var [updateToken, _] = await UserModel.setToken(result[0]['user_id'], refreshToken)
    
            console.log(updateToken)
        
            return res.json({
                registerState : true,
                refreshtoken : refreshToken,
                statusCode : 200,
                profile : result[0],
                provider_id : -1
            })
            
        } catch (error) {
            console.log(error)
            return res.json({
                registerState : false,
                err : error,
                statusCode : 404,
                provider_id : -1
            })
        }
    
    }

    
    static loginWithOtp = async (req, res) => {
        
        try {
            
            const {phone, otp} = req.body
            console.log("Helo")
            var result = await UserAction.loginWithOtp(phone, otp)
           
            console.log(result)
                return res.status(result.status? 200 : 404).json({
                    message : result.status ? 'login successfully' : 'login failed',
                    token : result.token ? result.token : null,
                    status : result.status
                })
        } catch (error) {
            return res.status(401).json({
                message : 'login failed',
                status : false
            })
        }
    }

    static sendOtpSmS = async (req, res) => {
        try {
            var result = await UserModel.sendOtpSmS(req.body.phone, req.body.otp)
            if(result){
                return res.status(200).json({
                    message : 'send otp successfully'
                })
            }else{
                return res.status(404).json({
                    message : 'your phone number is not exist'
                })
            }
        } catch (error) {
            console.log(error)
            return res.status(404).json({
                message : 'send otp fail'
            })
        }
    }


    static updateAccount = async (req, res) => {
        try {
            console.log(req.body)
    
            const salt = await bcrypt.genSalt(10)
    
            req.body.password = req.body.password ? await bcrypt.hash(req.body.password, salt) : null
            
            var result = await UserModel.updateUser(req.body)
           
            console.log(result)
            if(result['inforUpdate'] !== null){
                return res.status(200).json({
                    message : 'Update successfully',
                    refreshToken : result['refreshToken']
                })
            }
            else{
                return res.status(404).json({
                    message : 'Account id not exist'
                })
            }
        } catch (error) {
            console.log(error)
            return res.status(404).json({
                message : 'Cannot update'
            })
        }
    }


    static sendEmailWithSM = (req, res) => {

      
          try {
            const {phone, email} = req.body
            var result = UserAction.sendEmailToResestPassword(phone, email)
            res.status(200).json({
              status : true,
              message : "resest password successfully"
            })
          } catch (error) {
            console.log(error)
            res.status(404).json({
              status : false,
              message : 'resest password failed'
            })
          }
    }


    static changePassword = async (req, res) => {
        try {
           
            const salt = await bcrypt.genSalt(10)
            const password = await bcrypt.hash(req.body.password, salt);
            const [result, _] = await UserModel.changePassword(req.body, password)
            if(result){
                res.json({
                    status : true,
                    message : 'Change password successfully'
                })
            }
            else{
                res.json({
                    status : false,
                    message : 'Password change failed'
                })
            }
            
        } catch (error) {
            console.log(error)
            res.json({
                status : false,
                message : 'Password change failed'
            })
        }
    }


    static logout = async (req, res) => {
        try {
           
            
            const [result, _] = await UserModel.logout(req.body)
            if(result){
                res.json({
                    status : true
                
                })
            }
            else{
                res.json({
                    status : false
                   
                })
            }
            
        } catch (error) {
            console.log(error)
            res.json({
                status : false
              
            })
        }
    }


    static getProvider = async (req, res) => {
        const {accessToken} = req.body
        try {
            const decoded = jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET)
            if(decoded['email']){
                const [result, _] = await UserModel.findUserByEmail(decoded['email'])
                if(result[0]['role'] === 2)
                {
                    const provider_info = await UserModel.getProvider(result[0]['user_id'])
                    res.status(200).json({
                        status : true,
                        provider : provider_info
                    })
                }
                else{
                    res.status(200).json({
                        status : true,
                        message : "User is not a provider"
                    })
                }
                
            }
            else{
                if(decoded['phone']){
                    const [result, _] = await UserModel.findUserByPhone(decoded['phone'])
                    if(result[0]['role'] === 2)
                    {
                        const provider_info = await UserModel.getProvider(result[0]['user_id'])
                        res.status(200).json({
                            status : true,
                            provider : provider_info
                        })
                    }
                    else{
                        res.status(200).json({
                            status : true,
                            message : "User is not a provider",
                            provider : null
                        })
                    }
                }
                else{
                    
                res.status(401).json({
                        status : false,
                        message : "Access token is wrong",
                        provider : null
                    })
                }
            }
        } catch (error) {
            console.log(error)
            res.status(404).json({
                status : false,
                provider : null,
                message : "Unable to get provider information"
                })
        }
        
    }
 


    static addCustomerAddress = async (req, res) => {
        try {
            const status = await UserModel.addCustomerAddress(req.body)
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

    static updateCustomerAddress = async (req, res) => {
        try {
            const status = await UserModel.updateCustomerAddress(req.body)
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
}

module.exports = UserControllers