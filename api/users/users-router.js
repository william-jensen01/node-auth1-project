const express = require('express');
const Users = require('./users-model');
const loginCheck = require('../auth/logged-in-check-middleware');

const router = express.Router();

router.get('/', loginCheck, async (req, res) => {
    try {
        const users = await Users.find()
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json({ message: "error retrieving users" })
    }
});
router.get('/:id', loginCheck, async (req, res) => {
    try {
        const user = await Users.findById(req.params.id)
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json({ message: "error retrieving specified user" })
    }
});

module.exports = router;