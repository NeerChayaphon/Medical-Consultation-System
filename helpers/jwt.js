const jwt = require('jsonwebtoken');
const secret = process.env.secret;

const patientVerify = (req, res, next) => {
  const token = req.headers['x-acess-token'];
  if (!token) {
    res.send('You need token');
  } else {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.json({message: 'fail'});
      } else {
        if (decoded.isPatient) {
          req.body = {data: decoded};
          next();
        } else {
          res.json({message: 'User is not a Patient'});
        }
      }
    });
  }
};

module.exports = patientVerify;
