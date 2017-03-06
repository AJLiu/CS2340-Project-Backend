import * as express from 'express';
import * as passport from 'passport';
import * as httpStatus from 'http-status';
import * as validate from 'express-validation';

import { User, IUser } from '../models/user';
import { ensureLoggedIn } from '../helpers/auth';
import { validateRegister, validateLogin } from '../helpers/validate';

const router = express.Router();

/* GET users listing. */
router.get('/', ensureLoggedIn, function (req: any, res, next) {
  res.json(req.user);
});

/* POST register new user. */
router.post('/register', validate(validateRegister), function (req, res, next) {
  User.register(new User({
    username: req.body.username,
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
    title: req.body.title,
    address: req.body.address,
    userType: req.body.userType
  }), req.body.password, function (err) {
    if (err) {
      console.log('Error registering user!', err);
      res.status(httpStatus.BAD_REQUEST).json({
        message: err.message
      });
    }
    else {
      res.json({
        message: 'User registered'
      });
    }
  });
});

/* POST login user. */
router.post('/login', validate(validateLogin), passport.authenticate('local'), function (req: any, res) {
  res.json({ username: req.session.passport.user });
});

/* POST edit user. */
router.post('/edit', ensureLoggedIn, function (req: any, res, next) {
  User.findByUsername(req.session.passport.user, false, function (err, account: IUser) {
    if (err) {
      next(err);
    }
    else {
      if(typeof req.body.address !== 'undefined' && req.body.address)
        account.address = req.body.address;
      if(typeof req.body.firstName !== 'undefined' && req.body.firstName)
        account.firstName = req.body.firstName;
      if(typeof req.body.lastName !== 'undefined' && req.body.lastName)
        account.lastName = req.body.lastName;
      if(typeof req.body.title !== 'undefined' && req.body.title)
        account.title = req.body.title;
      if(typeof req.body.email !== 'undefined' && req.body.email)
        account.email = req.body.email;
      if(typeof req.body.userType !== 'undefined' && req.body.userType)
        account.userType = req.body.userType;

      account.save().then(function () {
        res.json(account);
      });
    }
  });
});

export = router;
