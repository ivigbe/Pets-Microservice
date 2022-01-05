const express = require('express');
const expressApp = require('./app');

const startServer = async() => {
  const app = express();

  await expressApp(app);

  const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;

  app.listen(port, function () {
      console.log('Server listening on port ' + port);
  })
  .on('error', (err) => {
    console.log(err);
    process.exit();
  });
};

startServer();
