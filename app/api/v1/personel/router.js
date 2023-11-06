const express = require('express');
const router = express();
const { create, index, find, update, destroy } = require('./controller');
const { authenticateUser } = require('../../../middlewares/auth');

router.get('/personels', authenticateUser ,index);
router.get('/personels/:nopers',authenticateUser, find);
router.post('/personels', authenticateUser, create);
router.put('/personels/:nopers', authenticateUser, update);
router.delete('/personels/:nopers', authenticateUser, destroy);



module.exports = router;