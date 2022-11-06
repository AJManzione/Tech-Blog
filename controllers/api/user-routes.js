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
    User.findOne({
        where: {
            username: req.body.username
        }
    })
})
.then(data => {
    if (!data) {
        res.status(400).json({
            message: 'No user with that username exists'
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
            message: 'Incorrect password'
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

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        })
    } else {
        res.status(404).end();
    }
})

module.exports = router;