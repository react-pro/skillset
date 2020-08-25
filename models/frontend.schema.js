const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FESchema = new Schema({
    name: "Front-End",
    skills: [{
        type: Schema.Types.ObjectId,
        ref: 'Skill'
    }]
});

module.exports = mongoose.model('Frontend', FESchema);
