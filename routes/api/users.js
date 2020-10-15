const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../../db/models/User');

router.get('/', (req, res) => {
    res.send("Users Route");
});

router.post('/', [
    body('email').isEmail(),
    body('password').isLength({ min: 5 })
],
async (req, res) => {
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
    // console.log(req.body);
    const { email, password } = req.body;

    try {
        let user = await User.findOne({email});
        if(user) {
            return res.status(400).json({
                errors: [{ msg: 'User already exist'}]
            });
        }

        user = new User({
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        const payload ={
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, config.get('jwtSecretKey'),
        (err, token) => {
            if(err) throw err;
            res.json({ token });
        });

        await user.save();
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;