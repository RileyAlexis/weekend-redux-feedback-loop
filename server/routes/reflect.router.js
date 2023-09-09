const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.post('/', (req, res) => {
    let queryString = `INSERT INTO "feedback" ("feeling", "understanding", "support", "comments")
                    VALUES ($1, $2, $3, $4);`;
    pool.query(queryString, 
        [
            req.body.feelings, 
            req.body.understanding, 
            req.body.support, 
            req.body.comments
        ])
    .then((result) => {
        res.sendStatus(200);
    })
    .catch((error) => {
        console.log(`Error making query ${queryString}`, error);
        res.sendStatus(500);
    })
})

module.exports = router;