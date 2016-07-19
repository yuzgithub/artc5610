module.exports = function() {
    var mongoose = require("mongoose");
    var WidgetSchema = mongoose.Schema({

        _page: {type: mongoose.Schema.Types.ObjectId, ref: 'Page'},
        widgetType: String, name: String, text: String,
        placeholder: String, description: String,imdbID: String,title:String,
        url: String, width: String,
        height: String, rows: Number,
        size: Number, class: String,
        icon: String, deletable: Boolean,
        formatted: Boolean, dateCreated: {type: Date, default: Date.now},
        order: Number

     
    }, {collection: "assignment.widget"});

    return WidgetSchema;
};