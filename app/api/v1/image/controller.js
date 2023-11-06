const {
  createImages,
  generateImage,
  getAllImage,
} = require("../../../services/prisma/image");
const { StatusCodes } = require("http-status-codes");

const create = async (req, res, next) => {
  try {
    const result = await createImages(req);
    res.status(StatusCodes.CREATED).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const index = async (req, res, next) => {
  try {
    const result = await getAllImage(req);
    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const download = async (req, res, next) => {
  try {
    const result = await generateImage(req);
    res.status(StatusCodes.OK).sendFile(result);
  } catch (err) {
    next(err);
  }
};

module.exports = { create, index, download };
