var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    title: {type: String, required: true},
    date: { type: String},
    description: {type: String},
    priority: { type: String },
    problemStatus: { type: String },
    dateOfCompletion: { type: String},
    status: { type: String},
    user: {type: Schema.Types.Mixed},
    // Izdvoji kao poseban model
    attachment: [{
        url: { type: String },
        name: { type: String },
        createdAt: { type: Date, default: Date.now()}
    }],
    // Izdvoji kao poseban model
    comments : [ {
        comment: { type: String, required: true },
        createdBy: { type: Schema.Types.Mixed },
        createdAt: { type: Date, default: Date.now()},
    }]
});

module.exports = mongoose.model('Task', schema);