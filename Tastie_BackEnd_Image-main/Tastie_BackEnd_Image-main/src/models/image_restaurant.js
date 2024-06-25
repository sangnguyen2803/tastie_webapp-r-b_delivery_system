const mongoose = require('mongoose')

const ImageRestaurantSchema = mongoose.Schema({
    provider_id : {
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

module.exports = ImageRestaurantModel = mongoose.model('ImageRestaurant',ImageRestaurantSchema)