const express = require('express');
const router = require('.');
const sequelize = require("../config/connection");

const {
    Post,
    User,
    Comment
} = require('../models');

router.get('/', (req, res) => {

})

router.get('/edit/:id', (req, res) => {

})

router.get('/new', (req, res) => {

})

module.exports = router;