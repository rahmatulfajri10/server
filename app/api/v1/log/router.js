const express = require('express');
const {  logMasuk, logKeluar } = require('./controller');
const router = express();


router.post('/logmasuk', logMasuk);
router.post('/logkeluar', logKeluar);
module.exports = router;