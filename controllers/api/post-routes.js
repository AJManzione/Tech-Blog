const router = require('express').Router();
const withAuth = require('../../utils/auth');
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
    .then((data) => res.json(data))
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

// get a single post 
router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'content', 'title', "created_at"],
        include: [{
            model: User,
            attributes: ['username']
        },
        {
            model: Comment,
            attributes: ['id', 'comment_body', 'post_id', 'user_id', "created_at"],
            include: {
                model: User,
                attributes: ['username']
            }
        }]
    })
    .then((data) => {
        if (!data) {
            res.status(404).json({
                message: 'no posts found'
            });
            return;
        }
        res.json(data);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});


// create a single post
router.post('/', withAuth, (req, res) => {
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

// update a post
router.put('/:id', withAuth, (req, res) => {
    Post.update({
        title: req.body.title,
        content: req.body.post_content
    }, { where: {
            id: req.params.id
        }
    })
    .then((data) => {
        if (!data) {
            res.status(404).json({
                message: 'Unable to find post'
            });
            return;
        }
        res.json(data);
    })
    .catch((err) => {
        console.log(err)
        res.status(500).json(err)
    });
});

// delete a post
router.delete('/:id', withAuth, (req, res) => {
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