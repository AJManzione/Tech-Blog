const router = require('express').Router();
const {
    User,
    Post,
    Comment
} = require('../../models');

// Get all comments
router.get('/', (req, res) => {
    Comment.findAll()
})

// Create a comment
router.post('/', (req, res) => {
    if (req.session) {
        Comment.create({
            comment_body: req.body.comment_body,
            post_id: req.body.post_id,
            user_id: req.body.user_id
        })
        .then(data => res.json(data))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    }
})


module.exports = router;