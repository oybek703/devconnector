const {Router} = require('express');
const {check, validationResult} = require('express-validator');
const auth = require('../../middleware/auth');
const User = require('../../models/user');
const Post = require('../../models/post');
const router = Router();

//add new post
router.post('/', [
  auth,
  [
      check('text', 'Text is required.').notEmpty()
  ]
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    try {
        const {text} = req.body;
        const user = await User.findById(req.user).select('-password');
        const newPost = new Post({
            user: req.user,
            text,
            name: user.name,
            avatar: user.avatar
        });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (e) {
        console.log(e);
        res.status(500).send('Server error.');
    }
});

//get all posts
router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find().sort({date: -1});
        res.status(200).json(posts);
    } catch (e) {
        console.log(e);
        res.status(500).send('Server error.');
    }
});

//get post by ID
router.get('/:postId', auth, async (req, res) => {
    try {
        const {postId} = req.params;
        const post = await Post.findById(postId);
        if(!post) {
            return res.status(404).json({msg: 'Post not found.'});
        }
        res.status(200).json(post);
    } catch (e) {
        console.log(e);
        if(e.kind === 'ObjectId') {
            return res.status(404).json({msg: 'Post not found.'});
        }
        res.status(500).send('Server error.');
    }
});

//delete post
router.delete('/:postId', auth, async (req, res) =>{
    try {
        const {postId} = req.params;
        const post = await Post.findById(postId);
        if(!post) {
            return res.status(404).json({msg: 'Post not found.'});
        }
        if(post.user.toString() !== req.user) {
            return res.status(403).json({msg: 'Access denied.'});
        }
        await post.remove();
        res.status(200).json({msg: 'Post removed.'});
    } catch (e) {
        if(e.kind === 'ObjectId') {
            return res.status(404).json({msg: 'Post not found.'});
        }
        console.log(e);
        res.status(500).send('Server error.');
    }
});

//like post
router.put('/like/:postId', auth, async (req, res) => {
    try {
        const {postId} = req.params;
        const post = await Post.findById(postId);
        const isLiked = post.likes.filter(like => like.user.toString() === req.user).length > 0;
        if(isLiked) {
            return res.status(400).json({msg: 'Post is already liked.'});
        }
        post.likes.unshift({user: req.user});
        await post.save();
        res.status(200).json(post.likes);
    } catch (e) {
        console.log(e);
        res.status(500).send('Server error.');
    }
});

//unlike post
router.put('/unlike/:postId', auth, async (req, res) => {
    try {
        const {postId} = req.params;
        const post = await Post.findById(postId);
        const isLiked = post.likes.filter(like => like.user.toString() === req.user).length === 0;
        if(isLiked) {
            return res.status(400).json({msg: 'Post is not liked yet.'});
        }
        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user);
        post.likes.splice(removeIndex, 1);
        await post.save();
        res.status(200).json(post.likes);
    } catch (e) {
        console.log(e);
        res.status(500).send('Server error.');
    }
});

//add comment
router.post('/comments', [
        auth,
        [
            check('text', 'Text is required.').notEmpty()
        ]
    ], async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        try {
            const {text} = req.body;
            const post = await Post.findOne({user: req.user});
            const user = await User.findById(req.user);
            post.comments.unshift({user: req.user, text, name: user.name, avatar: user.avatar});
            await post.save();
            res.status(201).json(post.comments);
        } catch (e) {
            console.log(e);
            res.status(500).send('Server error.');
        }
    });

//delete comment
router.delete('/comments/:postId/:commentId', auth, async (req, res) => {
    try {
        const {postId, commentId} = req.params;
        const post = await Post.findById(postId);
        const comment = post.comments.find(comment => comment.id === commentId);
        if(!comment) {
            return res.status(404).json({msg: 'Comment not found.'});
        }
        if(comment.user.toString() !== req.user) {
            return res.status(403).json({msg: 'Access denied.'});
        }
        post.comments = post.comments.filter(comment => comment.id !== commentId);
        await post.save();
        res.status(200).json(post.comments);
    } catch (e) {
        console.log(e);
        res.status(500).send('Server error.');
    }
});

module.exports = router;