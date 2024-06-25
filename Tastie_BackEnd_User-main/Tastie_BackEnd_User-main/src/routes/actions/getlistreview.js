const { url_get_list_review, url_get_all_category } = require("../../constant/url");
const requestControllers = require("../../controllers/requestcontrollers");




const getlistReview = app => {
    app.get(url_get_list_review,requestControllers.getListReview)
    app.get(url_get_all_category, requestControllers.getAllCategory)
}



module.exports = getlistReview;