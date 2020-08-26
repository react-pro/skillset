const mongoose = require('mongoose');
const mongooseMpath = require('mongoose-mpath');

const Schema = mongoose.Schema;

const Skill = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    links: {
        type: [{
            name: String,
            source: String,
        }],
        required: true
    }
});

Skill.plugin(mongooseMpath);

// function autoPopulateChildren(next) {
//     console.log(this.getQuery());
//     this.populate('children');
//     next();
// }

// Skill
//     .pre('findOne', autoPopulateChildren)
//     .pre('find', autoPopulateChildren);

module.exports = mongoose.model('Skill', Skill);
