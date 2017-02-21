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
  res.json({ username: req.session.passport.user });
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
  res.json(req.user);
});

/* POST edit user. */
router.post('/edit', ensureLoggedIn, function (req: any, res, next) {
  User.findByUsername(req.session.passport.user, false, function (err, account: IUser) {
    if (err) {
      next(err);
    }
    else {
      let newAccount:any = {};
      newAccount.address = req.body.address;
      newAccount.firstName = req.body.firstName;
      newAccount.lastName = req.body.lastName;
      newAccount.title = req.body.title;
      newAccount.email = req.body.email;

      account = Object.assign(account, newAccount);

      account.save().then(function () {
        res.json(newAccount);
      });
    }
  });
});

export = router;
