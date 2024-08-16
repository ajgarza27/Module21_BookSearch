const jwt = require('jsonwebtoken');

const secret = 'your_secret_key';
const expiration = '2h';

const authMiddleware = ({ req }) => {
  let token = req.headers.authorization || '';

  if (token) {
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
    }
  }

  return req;
};

const signToken = ({ email, _id, username }) => {
  const payload = { email, _id, username };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};

module.exports = { authMiddleware, signToken };