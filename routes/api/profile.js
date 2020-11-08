const {Router} = require('express');
const {check, validationResult} = require('express-validator');
const auth = require('../../middleware/auth');
const Profile = require('../../models/profile');
const User = require('../../models/user');
const router = Router();

//get user profile
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.user}).populate('user', 'name avatar');
        if(!profile) {
            return res.status(404).json({errors: [{msg: 'User profile not found.'}]});
        }
        res.status(200).json(profile);
    } catch (e) {
        console.log(e);
        res.status(500).send('Server error.');
    }
});

//create or update user profile
router.post('/',
    [
        auth,
        [
            check('status').notEmpty().withMessage('Status is required.'),
            check('skills').notEmpty().withMessage( 'Skills are required.'),
        ]
    ],
    async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    try {
        const {company, website, location, status, skills, bio, githubusername, youtube, twitter, facebook, linkedin, instagram} = req.body;
        let profileFields = {};
            profileFields.user = req.user;
            if(company)  profileFields.company = company;
            if(website) profileFields.website = website;
            if(location) profileFields.location = location;
            if(status) profileFields.status = status,
            profileFields.skills = skills.split(',').map(skill => skill.trim());
            if(bio) profileFields.bio = bio;
            if(githubusername) profileFields.githubusername = githubusername;
            profileFields.social = {};
            if(youtube) profileFields.social.youtube = youtube;
            if(twitter) profileFields.social.twitter = twitter;
            if(facebook) profileFields.social.facebook = facebook;
            if(linkedin) profileFields.social.linkedin = linkedin;
            if(instagram) profileFields.social.instagram = instagram;

        let profile = await Profile.findOne({user: req.user});
        if(profile) {
            profile = await Profile.findOneAndUpdate({user: req.user}, {$set: profileFields}, {new: true});
            return res.status(200).json(profile);
        }
        profile = await Profile.create(profileFields);
        await profile.save();
        res.status(201).json(profile);
    } catch (e) {
        console.log(e);
        res.status(500).send('Server error.');
    }
});

//get all profiles
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', 'name avatar');
        res.status(200).json(profiles);
    } catch (e) {
        console.log(e);
        res.status(500).send('Server error.');
    }
});

//get user profile by ID(public)
router.get('/user/:userId', async (req, res) => {
    const {userId} = req.params;
    try {
        const profile = await Profile.findOne({user: userId}).populate('user', 'name avatar');
        if(!profile) {
            return res.status(404).json({msg: 'User profile not found.'});
        }
        res.status(200).json(profile);
    } catch (e) {
        console.log(e);
        if(e.kind === 'ObjectId') {
            return res.status(404).json({msg: 'User profile not found.'});
        }
        res.status(500).send('Server error.');
    }
});

//delete user
router.delete('/', auth, async (req, res) => {
    try {
        await Profile.findOneAndDelete({user: req.user});
        await User.findByIdAndDelete(req.user);
        res.status(200).send({msg: 'User is deleted.'});
    } catch (e) {
        console.log(e);
        res.status(500).send('Server error.');
    }
});

//add(update) user profile experience
router.put('/experience',
    [
        auth,
        [
            check('company').notEmpty().withMessage('Company is required.'),
            check('from').notEmpty().withMessage('From time is required.')
        ]
    ],
    async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).send({errors: errors.array()});
    }
    try {
        const {title, company, location, from, to, current, description} = req.body;
        const profile = await Profile.findOne({user: req.user});
        profile.experience.unshift({title, company, location, from, to, current, description});
        await profile.save();
        res.status(200).json(profile);
    } catch (e) {
        console.log(e);
        res.status(500).send('Server error.');
    }
});

module.exports = router;