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

})

router.get('/new', (req, res) => {

})

module.exports = router;