const router = require('express').Router();
const {
    User,
    Post,
    Comment
} = require('../../models')

//gets all users
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

//gets a specific user
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: {
            exclude: ['password']
        },
        where: {
            id: req.params.id
        },
        include: [{
            model: Post,
            attributes: ['id', 'title', 'content']
        },
        {
            model: Comment,
            attributes: ['id', 'comment_body'],
            include: {
                model: Post,
                attributes: ['title']
            }
        }]
    })
    .then(data => {
        if (!data) {
            res.status(404).json({
                message: 'No user with that username found'
            });
            return;
        }
        res.json(data);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//creates a user
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
    });
});

//logs in the user 
router.post('/login', (req, res) => {
    User.findOne({
            where: {
                username: req.body.username
            }
        })
        .then(data => {
            if (!data) {
                res.status(400).json({
                    message: 'No user with that username found'
                });
                return;
            }

            req.session.save(() => {
                req.session.user_id = data.id;
                req.session.username = data.username;
                req.session.loggedIn = true;

                res.json({
                    user: data,
                    message: 'Loggin successful'
                });
            });

            const validPassword = data.checkPassword(req.body.password);

            if (!validPassword) {
                res.status(400).json({
                    message: 'Password incorrect'
                });
                return;
            }

            req.session.save(() => {
                req.session.user_id = data.id;
                req.session.username = data.username;
                req.session.loggedIn = true;

                res.json({
                    user: data,
                    message: 'Loggin successful'
                });
            });
        });
});

//logs out the user
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;