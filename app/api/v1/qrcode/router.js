const express = require("express");
const router = express();
const { index, createPers, createTamu, download } = require("./controller");

router.get("/qrcode", index);
router.post("/qrcodepersonel", createPers);
router.post("/qrcodetamu", createTamu);
router.get("/qrcode/:id", download);

module.exports = router;
