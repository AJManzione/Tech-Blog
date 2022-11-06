const router = require('express').Router();
const {
    User,
    Post,
    Comment
} = require('../../models')


// Get all the posts
router.get('/', (req, res) => {
    Post.findAll({
        attributes: ['id', 'content', 'title'],
        include: [{
            model: User,
            attributes: ['username'],
        },
        {
            model: Comment,
            attributes: ['id', 'comment_body', 'post_id', 'user_id'],
            include: {
                model: User,
                attributes: ['username']
            }
        }]
    })
})

router.get('/:id', (req, res) => {

})

router.post('/', (req, res) => {
    Post.create({
        title: req.body.title,
        content: req.body.post_content,
        user_id: req.session.user_id
    })
    .then((data) => res.json(data))
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {

})

router.delete('/:id', (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        },
    })
    .then((data) => {
        if (!data) {
            res.status(404).json({
                message: 'This post could not be found'
            });
            return;
        }
        res.json(data);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
})

module.exports = router;