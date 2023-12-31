const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../modules/pool');
const dotenv = require('dotenv');

const jwtkey = process.env.SECRET_KEY;


router.post('/signup', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    let queryString = `INSERT INTO users (email, hashed_password, role) VALUES($1, $2, $3);`;

    pool.query(queryString, [email, hashedPassword, 'user'])
        .then((result) => {
            //provess.env.secret created in node terminal : 
            //node -> require('crypto').randomBytes(64).toString('hex');
            //require(‘dotenv’).config();
            const token = jwt.sign({ email }, jwtkey, { expiresIn: '1hr' });
            res.json({ 'email': email, 'token': token });
        })
        .catch((error) => {
            res.json({ detail: 'Signup Failed' });
            console.log(error);

        })
})

router.post('/login', (req, res) => {
    console.log('login route call');
    const email = req.body.email;
    const password = req.body.password;
    let userRole = '';
    const queryString = `SELECT * FROM users WHERE email = $1`; 
    //Searches for existing email. Since usernames must be unique the database 
    //will only return 1 or 0 users

    pool.query(queryString, [email])
        .then((response) => {
            //if response.rows.length is 0 the user does not exist
            if (response.rows.length === 0) {
                res.json({ detail: 'User does not exist' });
            //if response.rows.length is 1 the user exists
            } else if (response.rows.length === 1) {
                //Compares user entered password to stored hash and returns true/false
                const hashedPassword = response.rows[0].hashed_password;
                const userRole = response.rows.role;
                console.log(userRole);
                return passwordsMatch = bcrypt.compare(password, hashedPassword);
            }
        })
        .then((passwordsMatch) => {
            console.log('Password matches', passwordsMatch);
            if (!passwordsMatch) {
                res.json({ detail: 'Invalid Credentials' });
            } else {
                const token = jwt.sign({ email }, jwtkey, { expiresIn: '1hr' });
                res.json({ 'email': email, 'token': token, 'role': userRole });
            }
        })
        .catch((error) => {
            console.error(error);
        })
})




module.exports = router;

