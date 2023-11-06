const express = require('express');
const router = express();
const { create , index} = require('./controller');

router.get('/statuspers', index);
router.post('/statuspers', create);
module.exports = router;