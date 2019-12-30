var md5 = require('md5');

var db = require('../db');


module.exports.login = function(req, res) {
  res.render('auth/login');
};

module.exports.postLogin = function(req, res) {
  var name = req.body.name;
  var phone = req.body.phone;

  var user = db.get('users').find({ name: name }).value();

  if (!user) {
    res.render('auth/login', {
      errors: [
        'User does not exist.'
      ],
      values: req.body
    });
    return;
  }

  var hashedphone = md5(phone);

  // if (user.phone !== hashedphone) 
  if (user.phone !== phone){
    res.render('auth/login', {
      errors: [
        'Wrong phone.'
      ],
      values: req.body
    });
    return;
  }

  res.cookie('userId', user.id, {
    signed: true
  });

  res.redirect('/users');
};
