const bcrypt = require('bcrypt');
const db = require('../Models/testModels');
const userController = {};
const workFactor = 10;

// get the hash value for 1234,

/* controller for verifying user login */
userController.verifyUser = async (req, res, next) => {
  try{
    // deconstruct the req body to get user and password
    // console.log('req.body', req.body);
    const { username, password } = req.body;
    
    // console.log("Username: ", username);
    // console.log("Password: ", password);
    

    //query will obtain hashed password of user
    const query = `
      SELECT * 
      FROM user_info 
      WHERE user_name = '${username}';`;
    // get hashed password and make query to db and see if it matches. If it does then redirect
    // the user to homepage
    // not working when trying to use db.query with promise chain

    //obtain user data from db based on username
    const user = await db.query(query);
    console.log('user: ', user);
    //authenticated will return a boolean if they entered the correct password
    const authenticated = await bcrypt.compare(password, user.rows[0].password);
    console.log('authenticated: ', authenticated);

    if (authenticated){
      const userObj = {username : user.rows[0].user_name, _id : user.rows[0]._id}
      res.locals.userObj = userObj;
      res.locals.result = true;
      return next();
    }
    else{
      return res.redirect('/login');
    }
  }
  catch(error){
    return next({
      log: "userController.verifyUser error",
      message: {
        error: error,
      }
    })
  }
};

//creates new user, sends back to the front end: username
userController.createUser = async (req, res, next) => {
  try{
    const { username, password } = req.body;
    // console.log('username', username);
    // console.log('password', password);
    const hash = await bcrypt.hash(password, workFactor);
    const query = `INSERT INTO user_info (user_name, password) VALUES ('${username}', '${hash}') RETURNING *;`
    const user = await db.query(query);
    console.log('data from db query', user);

    //this object will contain user_id as well as username
    const userObj = {username : user.rows[0].user_name, _id : user.rows[0]._id}
    console.log('userObj', userObj);
    res.locals.userObj = userObj;
    return next();
  }
  catch(error){
    return next({
      log: 'ERROR in userController.createUser middleware',
      message: {
        error: error,
      },
    });
  } 
}

module.exports = userController;





