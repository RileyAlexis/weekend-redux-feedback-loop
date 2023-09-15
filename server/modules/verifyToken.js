const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    console.log(req.body);
}

module.exports = authMiddleware;