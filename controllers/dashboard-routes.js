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
            attributes: ['id', 'comment_body', 'post_id', 'user_id']
        }] 
    })
})

router.get('/edit/:id', withAuth, (req, res) => {

})

router.get('/new', (req, res) => {

})

module.exports = router;