const Skill = require('./schemas/skill.schema');

class SkillModel {

    async addFirstNode(node, links) {
        try {
            const obj = {
                children: [],
                name: node,
                links
            };
            return await Skill.create(obj);
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    }

    async addNode(parent, node, links) {
        try {
            const obj = {
                children: [],
                name: node,
                links
            };
            const newNode = await Skill.create(obj);
            return await Skill.findOneAndUpdate({name: parent}, {$push: {children: newNode._id}});
        } catch (err) {
            console.log(err);
            throw new Error(err.message);
        }
    }

    async getNodeByName(name) {
        try {
            return await Skill.find({name}).populate('children');
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async isEmpty() {
        try {
            const res = await Skill.find();
            return !!res;
        } catch (err) {
            throw new Error(err);
        }
    }
}

module.exports = new SkillModel();
