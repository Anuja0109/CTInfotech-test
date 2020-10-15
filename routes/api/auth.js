const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const auth = require('../../db/middlewares/auth');
const User = require('../../db/models/User');


router.get('/', auth, async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select('-password');

        res.json(user);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

router.post('/', [
    body('email').isEmail(),
    body('password').exists()
],
async (req, res) => {
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
      const user = await User.findOne({email});

      if(!user) {
          return res.status(400).json({ errors: [{ msg: "Invalid Credentials"}]});
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if(!isMatch) {
        return res.status(400).json({ errors: [{ msg: "Invalid Credentials"}]});
      }

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

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');   
  }
})



module.exports = router;