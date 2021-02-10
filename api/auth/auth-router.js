const express = require('express');
const Users = require('../users/users-model');
const bcrypt = require('bcryptjs');

const router = express.Router();

router.post('/register', async (req, res) => {
    let user = req.body;

    const hash = bcrypt.hashSync(user.password, 10); // hash password 2^10 times
    user.password = hash;
    
    try {
        const newUser = await Users.add(user);
        req.session.user = newUser;
        res.status(201).json(newUser)
    } catch (err) {
        res.status(500).json({ message: "error registering user", error: err})
    }
});

router.post('/login', async (req, res) => {
    let { username, password } = req.body;

    try {
        const user = await Users.findBy({username});

        if (user && bcrypt.compareSync(password, user.password)) {
            req.session.user = user;
            res.status(200).json({ message: `welcome ${user.username}!` });
        } else {
            res.status(401).json({ message: "invalid creds" })
        }
    } catch (err) {
        res.status(500).json({ message: "error logging in", error: err })
    }
});

router.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy((err) => {
            if (err) {
                res.send("you can check out anytime you like...");
            } else {
                res.send("so long and thanks for all the fish...");
            }
        })
    } else {
        res.send();
    }
})

module.exports = router;