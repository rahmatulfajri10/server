const express = require("express");
const router = express();
const { create, index, download } = require("./controller");
const upload = require("../../../middlewares/multer");

router.post("/images", upload.single("foto"), create);
router.get("/images", index);
router.get("/images/:id", download);

module.exports = router;
