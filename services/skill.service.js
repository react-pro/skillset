const SkillModel = require('../models/skill.model');

class SkillService {
    async addNode(parent, node, links) {
        if(!parent) {
            console.log("In IF")
            const isEmpty = await SkillModel.isEmpty();
            console.log(isEmpty, node)
            if(isEmpty) {
                return await SkillModel.addFirstNode(node, links);
            } else {
                throw new Error("Provide parent for node!");
            }
        }
        return await SkillModel.addNode(parent, node, links);
    }
}

module.exports = new SkillService();
