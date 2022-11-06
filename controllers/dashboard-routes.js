const router = require('express').Router();
const sequelize = require("../config/connection");

const {
    Post,
    User,
    Comment
} = require('../models');

router.get('/', (req, res) => {
    if(req.session.loggedIn) {
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
}
})

router.get('/edit/:id', (req, res) => {

})

router.get('/new', (req, res) => {

})

module.exports = router;