const cookieController = {};

cookieController.setUserCookie = (req, res, next) => {
  const { _id, username } = res.locals.userObj;
  res.cookie('specialcookie', { _id: _id, username: username }, { httpOnly: true });
  return next();
}

cookieController.verifyCookie = (req, res, next) => {
  console.log('req.cookies', req.cookies)
  // console.log(req.cookies.specialcookie);
  // console.log('parsed', cookie.parse)
  if (req.cookies.specialcookie) {
    res.locals.usercookie = req.cookies.specialcookie;
  } else {
    // what to do if no cookie
    res.locals.usercookie = false;
  }
  return next();
}



module.exports = cookieController;