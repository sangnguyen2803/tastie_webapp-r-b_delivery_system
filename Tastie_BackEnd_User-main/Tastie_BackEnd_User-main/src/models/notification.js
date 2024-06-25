require("dotenv").config();



const sendgridMail = require('@sendgrid/mail');

sendgridMail.setApiKey(process.env.API_KEY_MAIL)



const mongoose = require('mongoose')


const NotificationSchema = mongoose.Schema({
    user_id : {
        type : Intl,
        require : true
    } ,
    content : {
        type : String,
        require : false
    },
    create_at : {
        type : Date,
        require : false
    }
})


const NotificationModel = mongoose.model("Notifications",NotificationSchema); 



class NotificationModels{

    static async addNotification(data){
        try {
            const {user_id, content} = data
            const newNotifi = new NotificationModel({
                user_id,
                content,
                create_at : new Date().toUTCString('vi-VI')
            });
            await newNotifi.save()

           
            return true

            
        } catch (error) {
            return false   
        }
    }

    static async getNotification(user_id){
        try {
        
            var response = await NotificationModel.find({user_id : parseInt(user_id)}).exec();
           
            response = response.map((noti) => {
                return {
                    user_id : noti.user_id,
                    content : noti.content,
                    create_at : new Date(noti.create_at).toLocaleString('vi-VI')
                }
                
            })
            return response 
        } catch (error) {
            return []
        }
    }
}

module.exports = NotificationModels