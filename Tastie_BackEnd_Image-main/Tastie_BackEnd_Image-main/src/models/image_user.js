const mongoose = require('mongoose')

const ImageUserSchema = mongoose.Schema({
    user_id : {
        type : Intl,
        require : true
    },
    image_name : {
        type : String,
        require : true
    },
    image : {
        data:Buffer,
        contentType : String
    }
})

module.exports = ImageUserModel = mongoose.model('ImageUser',ImageUserSchema)