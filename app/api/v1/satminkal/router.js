const express = require('express');
const router = express();
const { create , index} = require('./controller');

router.get('/smkl', index);
router.post('/smkl', create);
module.exports = router;