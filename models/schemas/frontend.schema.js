const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FESchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    skills: [{
        type: Schema.Types.ObjectId,
        ref: 'Skill'
    }]
});

module.exports = mongoose.model('Frontend', FESchema);
