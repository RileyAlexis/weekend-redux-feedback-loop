const express = require('express');
const router = express.Router();
// const {register} = require('../controllers/register');
// const {login} = require('../contollers/login');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const pool = require('../modules/pool');
// router.post('/register', register);
// router.post('/login', login);

router.post('/signup', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log(req.body);
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    let queryString = `INSERT INTO users (email, hashed_password) VALUES($1, $2);`;
    pool.query(queryString, [email, hashedPassword])
        .then((result) => {
            const token = jwt.sign({email}, 'secret', {expiresIn: '1hr'});
            res.json({'email': email, token});
        })
        .catch((error) => {
            res.json({detail: 'Signup Failed'});
            console.log(error);
            res.sendStatus(500);
        })
    })

router.post('/login', (req, res) => {
    const {email, password} = req.body;
    const queryString = `SELECT * FROM users WHERE email = $1`;
    pool.query(queryString, [email])
        .then((response) => {
            if (!response.rows.length) return res.json({detail: 'User does not exist'})
            const success = bcrypt.compare(password, response.rows[0].hashed_Password);
            const token = jwt.sign({email}, 'secret', {expiresIn: '1hr'})
            if (success) {
                res.json({'email': response.rows[0].email, token})
            } else {
                res.json({ detail: "Login failed"});
            }
        })
        .catch((error) => {
            console.error(error);
        })
    })



module.exports = router;

