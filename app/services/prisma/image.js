const prisma = require("../../db/index");
const { NotFoundError } = require("../../errors");
const path = require("path");

/**
 * 1. kita gunain cara ini
 * 2. generate url setalah submit baru kita simpen images
 * */

// * 2. generate url setalah submit baru kita simpen images
const generateUrlImage = async (req) => {
  const result = `uploads/${req.file.filename}`;

  return result;
};

// * 1. kita gunain cara ini
const createImages = async (req) => {
  console.log(req.file);
  const result = await prisma.tbl_img.create({
    data: {
      url: req.file
        ? `uploads/${req.file.filename}`
        : "uploads/avatar/default.jpeg",
    },
  });

  return result;
};

// tambahkan function checking Image
const checkingImage = async (id) => {
  const result = await prisma.tbl_img.findFirst({
    where: {
      id_img: parseInt(id),
    },
  });

  if (!result) throw new NotFoundError(`Tidak ada Gambar dengan id :  ${id}`);

  return result;
};

const getAllImage = async () => {
  const result = await prisma.tbl_img.findMany();

  return result;
};

const generateImage = async (req) => {
  const { id } = req.params;

  const result = await prisma.tbl_img.findFirst({
    where: {
      id_img: parseInt(id),
    },
  });

  if (!result) throw new NotFoundError(`Tidak ada Gambar dengan id :  ${id}`);

  const fileDirectory = path.join(__dirname, "../../../public", result.url);

  return fileDirectory;
};

// jangan lupa export checkingImage
module.exports = { createImages, checkingImage, getAllImage, generateImage };
