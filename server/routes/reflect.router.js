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

router.put('/flag/:id', (req, res) => {
    let queryString = `
        UPDATE "feedback"
        SET "flagged" = NOT "flagged"
        WHERE "id" = $1
    `
    let id = req.params.id;
    pool.query(queryString, [id])
    .then((result) => {
        res.sendStatus(200);
    })
    .catch((error) => {
        console.log(`Error making query ${queryString}`, error);
        res.sendStatus(500);
})
})






router.get('/', (req, res) => {
    let queryString = `
                SELECT 
                "id", "feeling", "understanding", "support", "comments",
                TO_CHAR("date", 'YYYY-MM-fmDD') AS "date", "flagged"
                FROM "feedback"
                ORDER BY "date" ASC;`;
    pool.query(queryString)
    .then((result) => {
        res.send(result.rows);
    })
    .catch((error) => {
        console.log(`Error making query ${queryString}`, error);
        res.sendStatus(500);
    }
    )
})

module.exports = router;
