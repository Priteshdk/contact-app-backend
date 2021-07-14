const router = require('express').Router()
const controller = require('./contact.controller')

router.get('/', controller.findAll)
router.post('/', controller.create)
router.put('/:id', controller.update)
router.get('/:id', controller.findOne)
router.delete('/:id', controller.delete)

module.exports = router