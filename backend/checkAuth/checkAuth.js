const jwt = require('jsonwebtoken');


 const checkAuth = (req, res, next) => {
    //console.log( "reqq>>???  ", req.headers.authorization);
    jwt.verify(req.headers.authorization, 'secret',  (err, decoded) => {
        if (err) {
             res.status(401).json({ success: false, message: 'Not Authenticated', err});
        }
        next();
});}

module.exports = checkAuth;