var db = require('../../db');

module.exports.index = function(req, res) {
  var products = db.get('products').value();
  res.json(products);
};

module.exports.create = function(req, res) {
  var product = db.get('products').push(req.body).write();;
  res.json(product);
};
