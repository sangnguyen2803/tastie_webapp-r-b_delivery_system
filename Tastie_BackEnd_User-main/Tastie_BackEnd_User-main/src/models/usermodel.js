require("dotenv").config();
const host = require('../../config/connectMySql')
const bcrypt = require('bcrypt')
const moment = require('moment')
const jwt = require('jsonwebtoken');
const UserAction = require("./useraction");

const client = require('twilio')('AC7777ca9aeeae7c0582e1499a2e50efcd', 'd1fa0bc2fb18e8cbae0def56acc2967b', {
    lazyLoading: true
});



class UserModel {
    constructor(data){
        this.user_id = data.user_id ? data.user_id : null
        this.first_name = data.first_name ? data.first_name : null
        this.last_name = data.last_name ? data.last_name : null
        this.gender = data.gender ? data.gender : null
        this.birthday = data.birthday ? data.birthday : null
        this.email = data.email ? data.email : null
        this.phone = data.phone ? data.phone : null
        this.password = data.password ? data.password : null
        this.registered_at = data.registered_at ? data.registered_at : null
        this.role = data.role ? data.role : null
        this.last_login_at = data.last_login_at ? data.last_login_at : null
    }


    async registerUser(data) {
        
        // let sql = `
        // INSERT INTO user(phone, password, first_name, last_name, role, registered_at) 
        // VALUES(
        //     '${this.phone}',
        //     '${this.password}',
        //     '${this.first_name}',
        //     '${this.last_name}',
        //     '${this.role}',
        //     '${this.registered_at}'
        // )
        // `
        let sqlStoredProcedure = `CALL AccountRegistration ('${this.phone}', '${this.password}', '${this.role}', 
        '${this.email}', '${this.first_name}', '${this.last_name}', 1, '${this.registered_at}', '${this.registered_at}')`

        const [newUser, _] = await host.execute(sqlStoredProcedure);


        return newUser;

    }



    static findUserByPhone(phone){
        
        let sql = `SELECT * FROM Tastie.User WHERE phone = '${phone}'`

        return host.execute(sql);
    }

    static findUserByEmail(email){
        
        let sql = `SELECT * FROM Tastie.User WHERE email = '${email}'`

        return host.execute(sql);
    }

    static findUserById(Id){
        
        let sql = `SELECT * FROM Tastie.User WHERE user_id = ${Id}`

        return host.execute(sql);
    }

    static setToken(Id, token){
        
        let sql = `UPDATE Tastie.User SET user_token = '${token}' WHERE user_id = ${Id}`

        return  host.execute(sql);
    }


    static async validateLogin(data){
       
        if(data.phone){
            // var [user, _] = await UserModel.findUserById('1000004')
            // console.log(user)
            var [result, _] = await UserModel.findUserByPhone(data.phone)
            return await bcrypt.compare(data.password, result[0].password)
        }
        else{
            if(data.email){
                // var [user, _] = await UserModel.findUserById('1000004')
                // console.log(user)
                var [result, _] = await UserModel.findUserByEmail(data.email)
                console.log(result)
                return await bcrypt.compare(data.password, result[0].password)
            }
        }
        
       
    }

    static async sendOtpSmS(phone, otp){

      
        try {
            var context= client.messages.create({
                body : `Your code is : ${otp}`,
                to : `+84${phone}`,
                from : '+18508096047'
            }).then(message => {
                console.log(message)
            
            }).catch(err => {
                console.log(err)
                
            })
            
          
        } catch (error) {
            console.log(error)
            return false;
        }
        return true
        
    }



    static async resestPassword(phone,newpassword){
        let sqlStr = `
            UPDATE Tastie.User SET password = '${newpassword}' WHERE phone = '${phone}'
        `

        return host.execute(sqlStr)
    }

    static async changePassword(data, newpassword){
        if(data.phone){
            let sqlStr = `
            UPDATE Tastie.User SET password = '${newpassword}' WHERE phone = '${data.phone}'
        `
            return host.execute(sqlStr)
        }
        else{
            if(data.email){
                let sqlStr = `
                UPDATE Tastie.User SET password = '${newpassword}' WHERE email = '${data.email}'
                `
                return host.execute(sqlStr)
            }
            
        }
        
        return null
        
    }

    static async logout(data){
        if(data.phone){
            let sql = `UPDATE Tastie.User SET user_token = '' WHERE phone = '${data.phone}'`
            return host.execute(sql)
        }
        else{
            if(data.email){
                let sql = `UPDATE Tastie.User SET user_token = '' WHERE email = '${data.email}'`
                return host.execute(sql)
            }
            
        }
        
        return null
        
       

        
    }


    static async updateUser(data){

        var [user, _] = await UserModel.findUserById(data.account_id)

        var dataDate = `"${data.birthday ? data.birthday : user[0].birthday}"`
        
        const convert_date = moment(dataDate,
            "ddd MMM DD YYYY"
        ); // This is your query from MySQL
        
        let final_date = convert_date.format("YYYY-MM-DD"); // Using moment.format() with the given format, it converts the date

        

        if(user){
            let sqlStoredProcedure = `
            CALL UpdateAccount(${data.account_id}, '${data.phone ? data.phone : user[0].phone}', 
            '${data.email ? data.email : user[0].email}', '${data.password ? data.password : user[0].password}', 
            '${data.role ? data.role : user[0].role}', '${data.first_name ? data.first_name : user[0].first_name}',
            '${data.last_name ? data.last_name : user[0].last_name}', '${data.gender ? data.gender : user[0].gender}',
            '${data.birthday ? data.birthday : final_date}')
        `

            console.log(sqlStoredProcedure)

            if(data.phone){
                var refreshToken = jwt.sign({phone:data.phone}, process.env.REFRESH_TOKEN_SECRET)
                await this.setToken(data.account_id, refreshToken)
               
                return await {
                    inforUpdate : await host.execute(sqlStoredProcedure),
                    refreshToken
                }  
            }
            else{
                if(data.email){
                    var refreshToken = jwt.sign({email:data.email}, process.env.REFRESH_TOKEN_SECRET)
                    await this.setToken(data.account_id, refreshToken)
                    return await {
                        inforUpdate : await  host.execute(sqlStoredProcedure),
                        refreshToken
                    }  
                }
                else{
                    return await {
                        inforUpdate : await host.execute(sqlStoredProcedure),
                        refreshToken : null
                    }  
                }
            }

            
            
            
        }

        return null;

        
    }

    static async getProvider (user_id){
        try {
            let sql = `SELECT * FROM Tastie.Provider where user_id = ${user_id};`



            const [provider_info, _] =  await host.execute(sql)

            console.log("Hello")
            console.log(provider_info[0])
            const operation_time = await UserAction.getOperationsTime(provider_info[0]['provider_id'])

            let sqlGetProviderCategory = `CALL Get_Provider_Categories(${provider_info[0]['provider_id']});`

            const provider_category = await host.execute(sqlGetProviderCategory)

            const response = {
                provider_name : provider_info[0]['merchant_name'],
                provider_category: provider_category[0][0],
                address: provider_info[0]['address'],
                latitude: provider_info[0]['latitude'], 
                longitude: provider_info[0]['longitude'],
                operation_time :operation_time,
                rating: provider_info[0]['rating'],
                total_reviews: provider_info[0]['total_review'],
                avatar: provider_info[0]['avatar'],
                estimated_cooking_time: provider_info[0]['estimated_cooking_time'],
                provider_status: provider_info[0]['status'], // (1 open, 2 closed, 3 busy)
            }
            return response
        } catch (error) {
            console.log(error)
            return null
        }
    }

    static async addCustomerAddress (data){
        try {
            const {customer_id, address, city, type, longtitude, latitude} = data
            let addCustomerAddress = `CALL Add_Customer_Address(${customer_id}, '${address}', '${city}', ${type}, '${longtitude}', '${latitude}');`
            await host.execute(addCustomerAddress)
            return true

        } catch (error) {
            console.log(error)
            return false
        }
    }

    static async updateCustomerAddress (data){
        try {
            const {customer_id, address, city, type, longtitude, latitude} = data
            let updateCustomerAddress = `CALL Update_Customer_Address(${customer_id}, '${address}', '${city}', ${type}, '${longtitude}', '${latitude}');`
            await host.execute(updateCustomerAddress)
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

}


module.exports = UserModel;