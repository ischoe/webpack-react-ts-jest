import express from 'express';
import path from 'path';
import compression from 'compression';
//import favicon from 'serve-favicon';

/*eslint-disable no-console*/
const app = express(),
			port = '3001';

app.use(compression());
//app.use(favicon(__dirname + '/favicon.ico'));
app.use(express.static(path.join(__dirname, '../prod')));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../prod/index.html'))
});

app.listen(port, function (err) {
  if (err) {
    console.log(err)
  }
  console.info('==> Listening on port %s.', port);
});
