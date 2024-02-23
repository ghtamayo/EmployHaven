import jwt from 'jsonwebtoken';
import { key } from '../settings/keys.js';

const verifyToken = (req, res, next) => {
  if (!req.cookies.currentUser || !req.cookies.currentUser.token) {
    return res.status(401).redirect('/user/login');
  }

  jwt.verify(req.cookies.currentUser.token, key, (error, decoded) => {
    if (error) {
      return res.status(401).redirect('/user/login');
    } else {
      req.decoded = decoded;
      next();
    }
  });
};

export default verifyToken;
