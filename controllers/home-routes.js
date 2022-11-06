const router = require('express').Router();
const sequelize = require('../config/connection');
const {
    User,
    Post,
    Comment
} = require('../models');

router.get('/', (req, res) => {
    Post.findAll({
        attributes: ['id', 'title', 'content'],
        include: [{
            model: Comment,
            attributes: ['id', 'comment_body', 'post_id', 'user_id'],
            include: {
                model: User,
                attributes: ['username']
            }
        }]
    })
    .then(data => {
        const posts = data.map(post => post.get({
            plain: true
        }));

        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/post/:id', (req, res) => {

})

router.get('/login', (req, res) => {

})

router.get('/signup', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/')
    }

})

router.get('*', (req, res) => {
    res.status(404).send('404, bad request!')
})

module.exports = router;