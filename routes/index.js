const express = require('express');
const router = express.Router();
const SkillService = require('../services/skill.service');


router.get('/', function (req, res, next) {

});

router.post('/skill/add', async (req, res, next) => {
    const {parent, node, links} = req.body;
    try {
        const obj = await SkillService.addNode(parent, node, links);
        return res.status(201).json({parent: obj})
    } catch (err) {
        return res.status(500).json({error: err});
    }
});

router.get('/skill(:query)?', async (req, res) => {
    const {lastNode, name} = req.query;
    let nodes;
    try {
        if (name) {
            nodes = await SkillService.getNodeByName(name);
        } else if (lastNode) {
            //part tree
        } else {
            //all tree
        }
    } catch (err) {
        return res.status(500).json({error: err});
    }

    if (!nodes) {
        return res.status(404).json("Not Found");
    }

    return res.status(200).json(nodes);

})

module.exports = router;
