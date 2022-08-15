const router = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../../models/user')

// get user login page
router.get('/login', (req, res) => {
  res.render('login')
})

// get user register page
router.get('/register', (req, res) => {
  res.render('register')
})

// post register information to register an account
router.post('/register', async (req, res, next) => {
   try {
    const { name, email, password, confirmPassword } = req.body
    const errors = []
    // check if the register info is valid
    if (!email || !password || !confirmPassword) {
      errors.push({ message: 'Please fill in email, password, and confirm password fields.' })
    }
    if (password !== confirmPassword) {
      errors.push({ message: 'The password confirmation does not match!' })
    }
    if (errors.length) {
      return res.render('register', { errors, name, email, password, confirmPassword })
    }
    // check if the email already exists
    const isUserExisted = await User.exists({ email })
    if (isUserExisted) {
      errors.push({ message: 'User already exists!' })
      return res.render('register', { errors, name, email, password, confirmPassword })
    }
    // else store the user register information
    await User.create({ name, email, password: bcrypt.hashSync(password, bcrypt.genSaltSync(10), null) })
    req.flash('success_msg', 'Register successfully! Please login to your account.')
    res.redirect('/users/login')
  } catch(e) {
    console.log(e)
    next(e)
  }
})

module.exports = router