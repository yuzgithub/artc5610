module.exports = function() {

    var mongoose = require("mongoose");
    var PageSchema = require("./page.schema.server")();
    var Page = mongoose.model("Page", PageSchema);
//////////////////////////////////////////////FUNCTION DEFINITION//////////////////////////////////////////////////////
    var api = {

        createPage: createPage,
        findAllPagesForWebsite : findAllPagesForWebsite,
        findPageById:findPageById,
        updatePage:updatePage,
        deletePage:deletePage

    };
    return api;
////////////////////////////////PAGE  SETTING  REALTED///////////////////////////////////////////////////////////////
    function createPage(websiteId, page) {
        page._website = websiteId;
        return Page.create(page);
    }
    function deletePage(pageId){return Page.remove({_id: pageId});}

/////////////////////////////////PAGE DATA RETRIVAL AND UPDATE RELATED/////////////////////////////////////////////////
    function findAllPagesForWebsite(websiteId){return Page.find({"_website": websiteId});}

    function findPageById(pageId){return Page.findById(pageId);}

    function updatePage(pageId, page){
        return Page.update({_id: pageId},{
                $set: {
                    name: page.name,
                    title: page.title,
                    description:page.description
                }
            });
    }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

};
