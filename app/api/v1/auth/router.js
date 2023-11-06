const express = require('express');
const router = express()
const { signinCms, logout } = require('./controller')

router.post('/signin', signinCms)
router.post('/logout', logout)

module.exports = router;    