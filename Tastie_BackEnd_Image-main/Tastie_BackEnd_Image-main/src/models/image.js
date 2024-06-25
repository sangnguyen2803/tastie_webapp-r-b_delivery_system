const mongoose = require('mongoose')

const ImageProductSchema = mongoose.Schema({
    provider_id : {
        type : Intl,
        require : true
    },
    product_name : {
        type : String,
        require : true
    },
    image : {
        data:Buffer,
        contentType : String
    }
})

module.exports = ImageProductModel = mongoose.model('ImageProduct',ImageProductSchema)