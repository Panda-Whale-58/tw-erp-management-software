const bcrypt = require('bcrypt');
const db = require('../Models/testModels');
const userController = {};
const workFactor = 10;

// get the hash value for 1234,

/* controller for verifying user login */
userController.verifyUser = async (req, res, next) => {
  // deconstruct the req body to get user and password
  // console.log('req.body', req.body);
  const { username, password } = req.body;
  
  console.log("Username: ", username);
  console.log("Password: ", password);
  
  const query = `
    SELECT password 
    FROM user_info 
    WHERE user_name = '${username}';`;
  // get hashed password and make query to db and see if it matches. If it does then redirect
  // the user to homepage
  // not working when trying to use db.query with promise chain
  db.query(query, (err, result) => {
    if (err) {
      return next(err);
    }
    bcrypt.compare(password, result.rows[0]['password']).then((result) => {
      // console.log(result);
      if (result) {
        res.locals.result = true;
        return next();
      } else {
        return res.redirect('/login');
      }
    });
  });
};

userController.createUser = async (req, res, next) => {
  try{
    const { username, password } = req.body;
    const query = `INSERT INTO user_info (user_name, password) VALUES (${username}, ${hash}) RETURNING *;`
    const data = await db.query(query, [username, password]);

    const newUser = data.rows[0];
    res.locals.newUser = newUser;
    return next();
  }
  catch(err){
    return next({
      log: 'userController.createUser middleware ERROR',
      message: {
        err: err,
      }
    })
  }
};

module.exports = userController;
