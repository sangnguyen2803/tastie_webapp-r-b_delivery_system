const { url_search } = require("../../constant/url");
const requestControllers = require("../../controllers/requestcontrollers");




const SearchRouter = app => {
    app.post(url_search,requestControllers.SearchBar)
}



module.exports = SearchRouter;