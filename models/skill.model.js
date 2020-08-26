const Skill = require('./schemas/skill.schema');

class SkillModel {

    async addFirstNode(node, links) {
        try {
            const obj = {
                id: node,
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
                id: node,
                children: [],
                name: node,
                links
            };
            await Skill.create(obj);
            return await Skill.findOneAndUpdate({id: parent}, {$push: {children: node}});
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
