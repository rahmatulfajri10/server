const express = require('express');
const router = express();
const { create , index} = require('./controller');

router.get('/pangkat', index);
router.post('/pangkat', create);
module.exports = router;