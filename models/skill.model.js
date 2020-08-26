const Skill = require('./schemas/skill.schema');
const branches = require('../utils/constants');


class SkillModel {

    async addFirstNode(node, links) {
        try {
            const obj = {
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

    async getNodesFromBranch(branch) {
        try {
            if(branch === 'BASIC') {
                const basic = await Skill.findOne({name: branches[branch]});
                const child = await basic.getImmediateChildren()
                const tree = await this.createTree(1, basic);
                return tree;
            } else if(branch === 'ALL') {
                const basic = await Skill.findOne({name: branches.BASIC});
                return await basic.getChildrenTree({});
            } else {
                const main = await Skill.findOne({name: branches[branch]});
                const areaTree = await main.getChildrenTree({});
                if(areaTree.length > 0) {
                    main.children = areaTree
                }
                return main;
            }

        } catch (err) {
            console.log(err)
            throw new Error(err.message);
        }
    }

    async createTree(level, obj) {
        obj.children = await obj.getImmediateChildren();
        return level === 0 ? obj : this.createTree(level - 1, obj.children[0])
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
