import * as httpStatus from 'http-status';
import { IUser, User, UserTypes } from '../models/user';
export function ensureLoggedIn (req, res, next) {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    res.status(httpStatus.UNAUTHORIZED).json({
      message: 'Must be logged in'
    });
  }
  else {
    next();
  }
}

export function ensureWorker (req, res, next) {
  User.findByUsername(req.session.passport.user, false, function (err, account: IUser) {
    console.log(account.userType);
    if(account.userType===UserTypes.User) {
      res.status(httpStatus.UNAUTHORIZED).json({
        message: 'Wrong UserType'
      });
    } else {
      next();
    }
  });
}