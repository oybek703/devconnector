const {Router} = require('express');
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const auth = require('../../middleware/auth');
const router = Router();

//get user
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user).select('-password');
        res.status(200).json(user);
    } catch (e) {
        console.log(e);
        res.status(500).send('Server error.');
    }
});

//login user
router.post('/', [
    check('email').isEmail().withMessage('Please add valid email address.'),
    check('password').exists().withMessage('Password is required.')
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({errors: [{msg: 'Invalid credentials'}]});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({errors: [{msg: 'Invalid credentials'}]});
        }
        const token = await jwt.sign({user: user.id}, config.get('JWT_SECRET'), {expiresIn: 3600});
        res.status(200).json({token});
    } catch (e) {
        console.log(e);
        res.status(500).send('Server error.');
    }
});

module.exports = router;