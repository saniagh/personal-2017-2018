const mongoose = require('mongoose');

module.exports.connect = (dbUri) => {
  mongoose.connect(dbUri);

  mongoose.Promise = global.Promise;

  mongoose.connection.on('error', (err) => {
    console.log(
        `The following error has occurred when trying to connect to MongoDB: ${err}`);
    process.exit(1);
  });

  require('./models/users.js');
  require('./models/products-categories.js');
  require('./models/uploads.js');
  require('./models/product.js');
  require('./models/settings.js');
  require('./models/products-tags.js');
  require('./models/orders.js');
};
