const router = require('express').Router();
const {
    User,
    Post,
    Comment
} = require('../../models');

router.get('/', (req, res) => {
    Comment.findAll()
})


router.post('/', (req, res) => {
    Comment.create({
        comment_body: req.body.comment_body,
        post_id: req.body.post_id,
        user_id: req.body.user_id
    })
})


module.exports = router;