import * as httpStatus from 'http-status';
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