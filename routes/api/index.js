const router = require('express').Router()
const authMiddleware = require('../../middlewares/auth')
const auth = require('./auth')
const user = require('./user')
const contact = require('./contact')

// router.use('/auth', auth)
// router.use('/user', authMiddleware)
// router.use('/user', user)
router.use('/contact', contact)

module.exports = router