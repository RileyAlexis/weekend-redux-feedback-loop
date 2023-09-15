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
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    let queryString = `INSERT INTO users (email, hashed_password) VALUES($1, $2);`;
    pool.query(queryString, [email, hashedPassword])
        .then((result) => {
            //sends response.data.xxx
            //Need to setup cryptographic secret key using dotenv
            const token = jwt.sign({email}, 'secret', { expiresIn: '1hr' });
            res.json({'email': email, 'token': token});
        })
        .catch((error) => {
            res.json({detail: 'Signup Failed'});
            console.log(error);
            
        })
    })

router.post('/login', (req, res) => {
    console.log('login route call');
    const email = req.body.email;
    const password = req.body.password;
    const queryString = `SELECT * FROM users WHERE email = $1`;
    pool.query(queryString, [email])
        .then((response) => {
            console.log(response.rows, response.rows.length);
            if (response.rows.length === 0) { 
                res.json({detail: 'User does not exist'});
        } else if (response.rows.length > 0) {
            const hashedPassword = response.rows[0].hashed_password;
            return passwordsMatch = bcrypt.compare(password, hashedPassword);
            }
        })
            .then((passwordsMatch) => {
                console.log('Password matches', passwordsMatch);
                if (!passwordsMatch) {
                    res.json({detail: 'Invalid Credentials'});
                    } else {
                        const token = jwt.sign({email} , 'secret', {expiresIn: '1hr'});
                        res.json({'email': email, 'token': token});
                    }
                })    
        .catch((error) => {
            console.error(error);
        })
    })
    



module.exports = router;

