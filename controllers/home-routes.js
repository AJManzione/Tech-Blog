const router = require('express').Router();
const sequelize = require('../config/connection');
const {
    User,
    Post,
    Comment
} = require('../models');

router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'title',
            'content'
        ],
        include: [{
            model: Comment,
            attributes: ['id', 'comment_body', 'post_id', 'user_id'],
            include: {
                model: User,
                attributes: ['username']
            }
        }]
    })
})

router.get('/post/:id', (req, res) => {

})

router.get('/login', (req, res) => {

})

router.get('/signup', (req, res) => {

})

router.get('*', (req, res) => {
    res.redirect('/')
})

module.exports = router;