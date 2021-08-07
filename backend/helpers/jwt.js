const jwt = require('jsonwebtoken');
const secret = process.env.secret;

const patientVerify = (req, res, next) => {
  const token = req.headers['x-acess-token'];
  console.log(token);
  if (!token) {
    res.status(400).json({message: 'you need token'});
  } else {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.status(400).json({message: 'fail'});
      } else {
        if (decoded.type == 'patient') {
          req.body = decoded;
          next();
        } else {
          res.status(400).json({message: 'User is not a Patient'});
        }
      }
    });
  }
};

module.exports = patientVerify;
