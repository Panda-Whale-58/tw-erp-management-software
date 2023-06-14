const cookieController = {};

cookieController.setUserCookie = (req, res, next) => {
  const { _id, username } = res.locals.userObj;
  res.cookie('specialcookie', { _id: _id, username: username }, { httpOnly : true });
  return next();
}

cookieController.verifyCookie = (req, res, next) => {
    console.log('req.cookies', req.cookies)
    console.log(req.cookies.specialcookie);
    // console.log('parsed', cookie.parse)
    if (req.cookies._id) {
      res.locals.user_id = req.cookies._id
    } else {

    }
    return next();
}



module.exports = cookieController;