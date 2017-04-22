import * as express from 'express';
import * as path from 'path';
import { User, IUser } from '../models/user';
const router = express.Router();

router.get('/:reset', function (req, res, next) {
  User.findOne({ 'passwordReset': req.params.reset }, function (err, account: IUser) {
    if (err)
      console.log(err);
    if(account)
      res.sendFile(path.resolve(__dirname, '../..', 'client', 'reset.html'));
    else
      res.redirect('/');
  });
});

router.post('/:reset', function (req, res, next) {
  console.log(req.params.reset);
  User.findOne({ 'passwordReset': req.params.reset }, function (err, account: IUser) {
    if (err)
      console.log(err);
    account.setPassword(req.body.password, (err, result) => {
      if(err)
        console.log(err);
      console.log(result);
      account.passwordReset = null;
      account.save().then(function() {
        res.send('password reset');
      })
    });
  });
});

export = router;
