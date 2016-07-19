module.exports = function() {

    var mongoose = require("mongoose");
    var WebsiteSchema = require("./website.schema.server")();
    var Website = mongoose.model("Website", WebsiteSchema);

    var api = {
        createWebsite: createWebsite,
        findAllWebsitesForUser: findAllWebsitesForUser,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite,

    };

    return api;



//////////////////////////////////////////////////////WEBSTTE INFORMATION RELATED/////////////////////////////
    function findAllWebsitesForUser(userId) {
        // search the all websites of one particular user
        return Website.find({_user: userId});
    }

    function findWebsiteById(websiteId) {

        // retireival the webstie by website ID
        return Website.findById(websiteId);
    }

    function updateWebsite(websiteId, website) {
        // update the website information such as the description and name
        delete website._id;
        return Website.update({_id: websiteId},
            {$set :
                {
                    name: website.name,
                    description: website.description
                }
            }
        );
    }
  ////////////////////////////////////////////////////WEBSTIE SETTING ////////////////////////////////////////
    function createWebsite(userId, website) {
        //creat new website by using the information offered by user
        website._user = userId;
        return Website.create(website);
        console.log(website);

    }

    function deleteWebsite(websiteId) {

        //delete particular website
        return Website.remove({_id: websiteId});
    }
};
/////////////////////////////////////////////////////////////////////////////////////////////////