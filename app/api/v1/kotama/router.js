const express = require('express');
const router = express();
const { create , index} = require('./controller');


router.get('/kotama', index);
router.post('/kotama', create);
module.exports = router;