module.exports = function()
{
    var models={
        userModel:require("./user/user.model.server")(),
        websiteModel: require("./website/website.model.server")(),
        pageModel: require("./page/page.model.server")(),
        widgetModel: require("./widgets/widget.model.server")(),
        movieModel: require("./movie/movie.model.server.js")()


    }
    return models;
};
