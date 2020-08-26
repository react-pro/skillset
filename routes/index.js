const express = require('express');
const router = express.Router();
const SkillService = require('../services/skill.service');


router.get('/', function(req, res, next) {

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

module.exports = router;
