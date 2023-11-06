const express = require('express');
const router = express();
const { create, index, find, update, destroy } = require('./controller');
const { authenticateUser } = require('../../../middlewares/auth');

router.get('/tamu', authenticateUser, index);
router.get('/tamu/:nik',authenticateUser, find);
router.post('/tamu', authenticateUser, create);
router.put('/tamu/:nik',authenticateUser, update);
router.delete('/tamu/:nik',authenticateUser, destroy);



module.exports = router;