import jwt from 'jwt-simple';
import dotenv from 'dotenv';
import User from '../models/user_model';

dotenv.config({ silent: true });

// encodes a new token for a user object
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.AUTH_SECRET);
}

export const signin = (req, res, next) => {
  res.send({ token: tokenForUser(req.user) });
};

export const signup = (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).error('You must provide email and password');
  }

  User.findOne({ email })
    .then((result) => {
      if (result != null) {
        res.json(result);
      } else {
        const user = new User({ username, email, password });
        user.save()
          .then((r) => {
            res.json({ message: 'User created!' });
          })
          .catch((error) => {
            res.status(500).json({ error });
          });
        res.send({ token: tokenForUser(user) });
      }
    })
    .catch((error) => {
      res.status(500).json('error');
    });
};
