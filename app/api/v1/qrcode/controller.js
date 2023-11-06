const { StatusCodes } = require("http-status-codes");
const {
  getAllQrcode,
  createQrcodePersonel,
  createQrcodeTamu,
  generateQr,
} = require("../../../services/prisma/qrcode");

const createPers = async (req, res, next) => {
  try {
    const result = await createQrcodePersonel(req);
    res.status(StatusCodes.CREATED).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const createTamu = async (req, res, next) => {
  try {
    const result = await createQrcodeTamu(req);
    res.status(StatusCodes.CREATED).json({ data: result });
  } catch (err) {
    next(err);
  }
};
const index = async (req, res, next) => {
  try {
    const result = await getAllQrcode(req);
    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const download = async (req, res, next) => {
  try {
    const result = await generateQr(req);
    res.status(StatusCodes.OK).sendFile(result);
  } catch (err) {
    next(err);
  }
};

module.exports = { createPers, createTamu, index, download };
