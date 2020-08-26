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
            const parentNode = await Skill.findOne({name: parent});
            const obj = {
                children: [],
                name: node,
                links,
                parent: parentNode
            };
            return await Skill.create(obj);
            // return await Skill.findOneAndUpdate({name: parent}, {$push: {children: newNode._id}});
        } catch (err) {
            console.log(err);
            throw new Error(err.message);
        }
    }

    async getNodeByName(name) {
        try {
            const node = await Skill.findOne({name}).select('-parent -path');
            node.children = await node.getImmediateChildren({}, ['-parent', '-path', '-children']);
            return node;
        } catch (err) {
            console.log(err);
            throw new Error(err.message);
        }
    }

    async getNodesFromTo(first, last) {
        try {
            const firstNode = await Skill.findOne({name: first});
            const lastNode = await Skill.findOne({name: last});
            const ancestorsList = await lastNode.getAncestors();
            let tree;
            for(let i = 0; i < ancestorsList.length; i++) {
               const children = ancestorsList[i].getImmediateChildren({});

            }

            return ancestorsList;

        } catch (err) {
            console.log(err)
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
