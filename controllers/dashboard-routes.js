const router = require('express').Router();
const sequelize = require("../config/connection");
const withAuth = require('../utils/auth')

const {
    Post,
    User,
    Comment
} = require('../models');

router.get('/', withAuth, (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: ['id', 'title', 'content'],
        include: [{
            model: Comment,
            attributes: ['id', 'comment_body', 'post_id', 'user_id'],
            include: {
                model: User,
                attributes: ['username']
            }
        },
        {
            model: User,
            attributes: ['username']
        }] 
    })
    .then(data => {
        const posts = data.map(post => post.get({
            plain: true
        }));
        res.render('dashboard', {
            posts,
            loggedIn: true
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/edit/:id', withAuth, (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'title', 'content'],
        include: [{
            model: Comment,
            attributes: ['id', 'comment_body', 'post_id', 'user_id'],
            include: {
                model: User,
                attributes: ['username']
            }
        },
        {
            model: User,
            attributes: ['username']
        }]
    })
    .then(data => {
        if (!data) {
            res.status(404).json({
                message: 'no posts found'
            });
            return;
        }

        const post = data.get({
            plain: true
        });

        res.render('edit-post', {
            post,
            loggedIn: true
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})

router.get('/new', (req, res) => {
    res.render('add-post', {
        loggedIn: true
    });
});

module.exports = router;