const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

const userController = require('./Controllers/userController');
const dbRoute = require('./Routes/db');

/* handle parsing request body */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static('build'));

// statically serve everything in the build folder on the route '/build'
app.use('/build', express.static(path.join(__dirname, '../build')));

// serve index.html on the route '/'
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

app.get('/login', (req, res) => {
  // return res.status(200).sendFile(path.join(__dirname, '../index.html'));
  res.redirect('/');
});

app.post('/signup', userController.createUser, (req, res) => {
  res.status(200).json(res.locals.newUser);
});
// still need a place to redirect after successful login
app.post('/login', userController.verifyUser, (req, res) => {
  if (res.locals.result === true) {
    // return res.redirect('/');
    return res.send(res.locals.result);
  }
});

// handle get requests to the database
app.use('/db', dbRoute);

// handle unknown paths
app.use((req, res) => res.sendStatus(404));

// global error handler
app.use((err, req, res, next) => {
  //Define a default error object
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occured' },
  };
  // define an errorObj to combine new errors
  const errObj = Object.assign(defaultErr, err);
  console.log('Error: ', errObj.log);
  // return to the client the status and error message
  return res.status(errObj.status || 500).send(errObj.message);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

module.exports = app;
