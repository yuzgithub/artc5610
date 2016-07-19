/////////////////////////////////////////
var q = require("q");
//////////////////////////////////////


module.exports = function() {

    var mongoose = require("mongoose");
    var WidgetSchema = require("./widget.schema.server")();
    var Widget = mongoose.model("Widget", WidgetSchema);
//////////////////////////////////FUNCTION DEFINE//////////////////////////////////////////////////////////////////////////
    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage : findAllWidgetsForPage,
        findWidgetById:findWidgetById,
        updateWidget:updateWidget,
        deleteWidget:deleteWidget,
        reorderWidget:reorderWidget,
// ////////////////////////////////////////////////////////////////////
//         userLikesMovie: userLikesMovie,
//         userUnlikesMovie: userUnlikesMovie

    };
    return api;
///////////////////////////////////////////WIDGET SETTING FUNCTIONS//////////////////////////////////////////////////////


    function deleteWidget(widgetId){
        return Widget.remove({_id: widgetId});
    }


    function createWidget(pageId, widget) {
        widget._page = pageId;
        return Widget.create(widget);
    }
///////////////////////////////////////////WIDGET INFORMATION UPDATE//////////////////////////////////////////////////////

    function findAllWidgetsForPage(pageId){return Widget.find({"_page":pageId});}

    function findWidgetById(widgetId){return Widget.findById(widgetId);}

    // function updateWidget(widgetId, widget){delete widget._id;
    //     return Widget
    //         .update({_id: widgetId},{
    //             $set: widget
    //         });
    // }

    function updateWidget(widgetId, widget) {
        return Widget.update(
            {_id: widgetId},
            {$set :
            {
                name: widget.name || '',
                text: widget.text || '',
                placeholder: widget.placeholder || '',
                description: widget.description || '',
                url: widget.url || '',
                width: widget.width || '100%',
                height: widget.height || 'auto',
                rows: widget.rows || 1,
                size: widget.size || 1,
                class: widget.class || '',
                icon: widget.icon || '',
                deletable: widget.deletable || false,
                formatted: widget.formatted || false
            }
            }
        );
    }
///////////////////////////////////////////////////////WIDGET ORDER/////////////////////////////////////////////////////
    function reorderWidget(pageId,Sorder,Eorder) {

        var Sorder = parseInt(start);
        var Eorder = parseInt(end);


///////////////////////////////////////////////decompose the widget move into four conditions////////////////
        return Widget
            .find({_page: pageId}, function (err, widgets) {
                widgets.forEach(function (widget) {
                    if (start < end) {
                        if (widget.order > start && widget.order <= end) {
                            widget.order--;
                            widget.save();
                        }
                        else if (widget.order === start) {
                            widget.order = end;
                            widget.save();
                        }
                    } else {
                        if (widget.order >= end && widget.order < start) {
                            widget.order++;
                            widget.save();

                        }
                        else if (widget.order === start) {
                            widget.order = end;
                            widget.save();
                        }
                    }
                });
            });
    }



}


