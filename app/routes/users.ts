import * as express from 'express';
import * as passport from 'passport';
import * as httpStatus from 'http-status';
import * as validate from 'express-validation';

import {User} from '../models/user';
import {ensureLoggedIn} from '../helpers/auth';
import {validateRegister, validateLogin} from '../helpers/validate';

const router = express.Router();

/* GET users listing. */
router.get('/', ensureLoggedIn, function(req : any, res, next) {
  res.json({username: req.session.passport.user});
});

/* POST register new user. */
router.post('/register', validate(validateRegister), function(req, res, next) {
   User.register(new User({
    username: req.body.username,
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    isAdmin: false,
  }), req.body.password, function (err){
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
router.post('/login', validate(validateLogin), passport.authenticate('local'), function(req : any, res) {
  res.json({username: req.session.passport.user});
});

export = router;
