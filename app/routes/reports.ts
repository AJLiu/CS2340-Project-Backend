import * as express from 'express';
import * as passport from 'passport';
import * as httpStatus from 'http-status';
import * as validate from 'express-validation';

import { User, IUser } from '../models/user';
import { SourceReport } from '../models/report'
import { ensureLoggedIn } from '../helpers/auth';
import { validateSourceReport } from '../helpers/validate';

const router = express.Router();

/* POST create report. */
router.post('/source/submit', validate(validateSourceReport), ensureLoggedIn, function (req: any, res, next) {

  User.findByUsername(req.session.passport.user, false, function (err, account: IUser) {
    const model = new SourceReport({
      timestamp: new Date().getTime(),
      submitter: account,
      location: {
        lat: req.body.location.lat,
        long: req.body.location.long
      },
      waterType: req.body.waterType,
      waterCondition: req.body.waterCondition
    });
    model.save((err) => {
      if(err) {
        res.send(err);
      }
      res.send("Report submitted")
    })
  });
});

router.get('/source/', ensureLoggedIn, (req: any, res, next) => {
  SourceReport.find({}).populate('submitter').exec((err, reports) => {
    if(err) {
      res.send(err);
    }
    res.send(reports)
  })
});

export = router;