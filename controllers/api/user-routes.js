const router = require('express').Router();
const {
    User,
    Post,
    Comment
} = require('../../models')

router.get('/', (req, res) => {
    User.findAll({
        attributes: {
            exclude: ['password']
        }
    })
    .then(data => res.json(data))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {

})

router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    })
    .then(data => {
        req.session.save(() => {
            req.session.user_id = data.id;
            req.session.username = data.username;
            req.session.loggedIn = true;

            res.json(data);
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

router.post('/login', (req, res) => {
    
})

router.post('/logout', (req, res) => {

})

module.exports = router;