const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    console.log(req.rawHeaders);
}

module.exports = authMiddleware;