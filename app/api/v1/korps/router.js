const express = require('express');
const router = express();
const { create , index} = require('./controller');

router.get('/korps', index);
router.post('/korps', create);
module.exports = router;