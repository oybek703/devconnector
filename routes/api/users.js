const {Router} = require('express');
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = Router();

//register new user
router.post('/', [
  check('name').not().isEmpty().withMessage('Name is required.'),
  check('email').isEmail().withMessage('Please enter valid email address.'),
  check('password').isLength({min: 6}).withMessage('Password must include at least 6 characters.')
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const {name, email, password} = req.body;
    try{
        let user = await User.findOne({email});
        if(user) {
            return res.status(400).json({errors: [{msg: 'User already exists.'}]});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const avatar = gravatar.url(email, {s: '200', r: 'g', d: 'mp'});
        user = await User.create({name, email, password: hashedPassword, avatar});
        const token = await jwt.sign({user: user.id}, config.get('JWT_SECRET'), {expiresIn: 3600 });
        res.status(201).json({token});
    } catch (e) {
        console.log(e.message);
        return res.status(500).send('Server error.');
    }
});

module.exports = router;