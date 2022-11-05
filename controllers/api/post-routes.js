const router = require('express').Router();
const {
    User,
    Post,
    Comment
} = require('../../models')

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

})

router.put('/:id', (req, res) => {

})

router.delete('/:id', (req, res) => {

})

module.exports = router;