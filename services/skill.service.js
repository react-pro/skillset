const SkillModel = require('../models/skill.model');
const branches = require('../utils/constants');


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

    async getNodeByName(name) {
        return await SkillModel.getNodeByName(name);
    }

    async getNodesFromBranch(branch) {
        if(!branches[branch]) {
            return null;
        }
        return await SkillModel.getNodesFromBranch(branch);
    }
}

module.exports = new SkillService();
