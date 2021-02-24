exports.validationInput = (req, res, next) => {
  var dataErr = {}
  var regExpName = /^[a-zA-Z\-]+$/
  var regExpLast = /^[a-zA-Z\-]+$/
  var regExpUserName = /^\D{2,}\d*$/i

  // /^[a-zA-Z0-9]+$/;
  ///^\D{2,}\d*$/i // for the username regex
  var regExpEmail = /([A-Z]|[a-z]|[^<>()\[\]\\\/.,;:\s@"]){4,}\@([A-Z]|[a-z]|[^<>()\[\]\\\/.,;:\s@"]){4,}\.(com|net)/
  var regExpPassword = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/
  req.body.userName
    ? regExpUserName.test(req.body.userName)
      ? ''
      : (dataErr.validUserNameErr = 'Enter a valid username')
    : ''
  req.body.firstName
    ? regExpName.test(req.body.firstName)
      ? ''
      : (dataErr.validFirstNameErr = 'Enter a valid firstName')
    : ''
  req.body.lastName
    ? regExpLast.test(req.body.lastName)
      ? ''
      : (dataErr.validLastNameErr = 'Enter a valid lastname')
    : ''
  req.body.email
    ? regExpEmail.test(req.body.email)
      ? ''
      : (dataErr.validEmailErr = 'Enter a valid email')
    : ''
  req.body.password
    ? regExpPassword.test(req.body.password)
      ? ''
      : (dataErr.validPassErr = 'Enter a valid password')
    : ''
  req.body.cnfrmPassword
    ? regExpPassword.test(req.body.cnfrmPassword)
      ? ''
      : (dataErr.validCnfpErr = 'Enter a valid password')
    : ''
  req.body.newPassword
    ? regExpPassword.test(req.body.newPassword)
      ? ''
      : (dataErr.validNewpErr = 'Enter a valid password')
    : ''
  if (req.body.userName === '')
    dataErr.validUserNameErr = 'Enter a valid username'
  if (req.body.password === '') dataErr.validPassErr = 'Enter a valid password'
  if (req.body.bio === '') dataErr.validBio = 'Enter a valid bio'
  if (req.body.age === '') dataErr.validAge = 'Enter Your Age'
  // if this is some erro comment this line

  // if (req.body.tag === undefined || req.body.tag.length === 0)
  //   dataErr.validTag = 'Enter a valid tag'

  if (
    regExpName.test(req.body.firstName) &&
    regExpLast.test(req.body.lastName) &&
    regExpUserName.test(req.body.userName) &&
    regExpEmail.test(req.body.email) &&
    regExpPassword.test(req.body.password) &&
    regExpPassword.test(req.body.cnfrmPassword) &&
    regExpPassword.test(req.body.newPassword)
  )
    next()
  else {
    res.locals.input = dataErr
    next()
  }
  //after passing error to res.locals ... merge the object in the next middleware
};
  