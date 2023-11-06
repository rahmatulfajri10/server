const express = require('express');
const router = express();
const { create , index} = require('./controller');

router.get('/role', index);
router.post('/role', create);
module.exports = router;