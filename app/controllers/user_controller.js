import jwt from 'jwt-simple';
import User from '../models/user_model';
import dotenv from 'dotenv';

dotenv.config({ silent: true });

export const signin = (req, res, next) => {
  res.send({ user_id: req.user._id, token: tokenForUser(req.user) });
};

export const signup = (req, res, next) => {
  const phone = req.body.phone;
  const password = req.body.password;

  if (!phone || !password) {
    return res.status(422).send('You must provide a phone and password');
  }

  User.findOne({ phone }, (error, existingUser) => {
    if (!existingUser) {
      // Save the user
      const user = new User();
      user.phone = phone;
      user.password = password;
      user.save()
      .then(result => {
        res.send({ user_id: user._id, token: tokenForUser(user) });
      })
      .catch(createError => {
        res.json({ createError });
      });
    } else {
      res.status(422).send('A user already exists with that phone number!');
    }
  });
};

// encodes a new token for a user object
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user._id, iat: timestamp }, process.env.API_SECRET);
}
