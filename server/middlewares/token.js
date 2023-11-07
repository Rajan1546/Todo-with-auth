const jwt = require('jsonwebtoken');


function authToken(req, res, next) {
    const token = req.headers.token;
    if (!token) 
    return res.status(401).send('Access denied. No token provided.');
  
    try {
      const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
      req.userId = decoded._id;
      next();
    } catch (ex) {
      console.log(ex)
      res.status(400).send('Invalid token.');
    }
  }
  module.exports = authToken
