const PaymentModels = require("../models/payment")



class PaymentControllers {

    static paymentWithMomo = async (req, res) => {
        try {
            const url = await PaymentModels.paymentWithMomo(req.body)
            res.status(200).json({
                status : true,
                url
            })
        } catch (error) {
            res.status(404).json({
                status : false,
                url : ''
            })
        }
    }
    static paymentWithZalo = async (req, res) => {
        try {
            const url = await PaymentModels.paymentWithZalo(req.body)
            res.status(200).json({
                status : true,
                url
            })
        } catch (error) {
            res.status(404).json({
                status : false,
                url : ''
            })
        }
    }
}


module.exports = PaymentControllers