const expressJwt = require('express-jwt');

function authJwt() {
  const secret = process.env.secret;
  const api = process.env.API_URL;
  return expressJwt({
    secret,
    algorithms: ['HS256'],
    isRevoked: isRevoked,
  }).unless({
    path: [
      // {url: /\/public\/uploads(.*)/, methods: ['GET', 'OPTIONS']},
      // {url: /\/api\/v1\/products(.*)/, methods: ['GET', 'OPTIONS']},
      // {url: /\/api\/v1\/categories(.*)/, methods: ['GET', 'OPTIONS']},
      // {url: /\/api\/v1\/orders(.*)/, methods: ['GET', 'OPTIONS', 'POST']},
      //{url: /\/api\/v1\/users(.*)/, methods: ['GET', 'OPTIONS', 'POST']},
      {url: /\/api\/v1\/patient(.*)/, methods: ['GET', 'OPTIONS', 'POST']},
      `${api}/patient/login`,
      `${api}/patient/register`,
    ],
  });
}

async function isRevoked(req, payload, done) {
  if (!payload.isDoctor) {
    done(null, true);
  }

  done();
}

module.exports = authJwt;
