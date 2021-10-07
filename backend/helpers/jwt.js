const jwt = require('jsonwebtoken');
const secret = process.env.secret;

exports.userVerify = (userList) => {
  return (req, res, next) => {
    const token = req.headers['x-acess-token'];
    console.log(token);
    if (!token) {
      res.status(400).json({message: 'you need token'});
    } else {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          res.status(400).json({message: 'fail'});
        } else {
          if (userList.includes(decoded.type)) {
            //req.body = decoded;
            res.locals = decoded;
            next();
          } else {
            res.status(400).json({message: "You don't have autherize"});
          }
        }
      });
    }
  };
}

exports.userVerifyId = (userList) => {
  return (req,res,next) => {
    if (userList.includes(res.locals.type)) {
      if(res.locals.id != req.params.id) {
        res.status(400).json({message: "You don't have autherize"});
      } else {
        next();
      }
    } else {
      next();
    }
  }
}

// exports.patientVerify = (req, res, next) => {
//   const token = req.headers['x-acess-token'];
//   console.log(token);
//   if (!token) {
//     res.status(400).json({message: 'you need token'});
//   } else {
//     jwt.verify(token, secret, (err, decoded) => {
//       if (err) {
//         res.status(400).json({message: 'fail'});
//       } else {
//         if (['patient', 'admin'].includes(decoded.type)) {
//           //req.body = decoded;
//           res.locals = decoded;
//           next();
//         } else {
//           res.status(400).json({message: 'User is not a Patient or Admin'});
//         }
//       }
//     });
//   }
// };


// exports.doctorAdminVerify = (req, res, next) => {
//   const token = req.headers['x-acess-token'];
//   console.log(token);
//   if (!token) {
//     res.status(400).json({message: 'you need token'});
//   } else {
//     jwt.verify(token, secret, (err, decoded) => {
//       if (err) {
//         res.status(400).json({message: 'fail'});
//       } else {
//         if (['doctor', 'admin'].includes(decoded.type)) {
//           //req.body = decoded;
//           res.locals = decoded;
//           next();
//         } else {
//           res.status(400).json({message: 'User is not a Doctor or Admin'});
//         }
//       }
//     });
//   }
// };

// exports.adminVerify = (req, res, next) => {
//   const token = req.headers['x-acess-token'];
//   console.log(token);
//   if (!token) {
//     res.status(400).json({message: 'you need token'});
//   } else {
//     jwt.verify(token, secret, (err, decoded) => {
//       if (err) {
//         res.status(400).json({message: 'fail'});
//       } else {
//         if (decoded.type == 'admin') {
//           //req.body = decoded;
//           res.locals = decoded;
//           next();
//         } else {
//           res.status(400).json({message: 'User is not a Admin'});
//         }
//       }
//     });
//   }
// };

// exports.userIdCheck = (req,res,next) => {
//   if (res.locals.type != "admin") {
//     if(res.locals.id != req.params.id) {
//       res.status(400).json({message: "You don't have autherize"});
//     } else {
//       next();
//     }
//   } else {
//     next();
//   }
// }


// exports.patientWithID = (req, res, next) => {
//   const token = req.headers['x-acess-token'];
//   console.log(token);
//   if (!token) {
//     res.status(400).json({message: 'you need token'});
//   } else {
//     jwt.verify(token, secret, (err, decoded) => {
//       if (err) {
//         res.status(400).json({message: 'fail'});
//       } else {
//         if (decoded.type != 'patient') {
//           res.locals = decoded;
//           next();
//         } else {
//           if (decoded.id == req.params.id) {
//             res.locals = decoded;
//             next();
//           } else {
//             res.status(400).json({message: "You don't have autherize"});
//           }
//         }
//       }
//     });
//   }
// };