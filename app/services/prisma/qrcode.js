const prisma = require("../../db/index");
const { NotFoundError } = require("../../errors");
const { createJWT } = require("../../utils");
const {
  createQrcodePers,
  createQrcodeGuest,
} = require("../../utils/createTokenUser");
const generateQR = require("../../utils/generateqr");
const { otpMail } = require("../mail");
const path = require("path");

const createQrcodePersonel = async (req) => {
  const { nopers, expired } = req.body;
  const pers = await prisma.tbl_personel.findFirst({
    where: {
      nopers: nopers,
    },
  });
  if (!pers) throw new NotFoundError("Personel tidak ditemukan");
  const qrcodetoken = createJWT(createQrcodePers(pers));

  const result = await prisma.tbl_qrcode.create({
    data: {
      url: qrcodetoken,
      expired: new Date(expired),
    },
  });

  const update = await prisma.tbl_personel.update({
    where: {
      nopers: nopers,
    },
    data: {
      id_qrcode: result.id_qrcode,
    },
  });
  await generateQR(update, result.url);
  // await otpMail(pers.email, pers)

  return result;
};

const createQrcodeTamu = async (req) => {
  const { nik, expired } = req.body;
  const tamu = await prisma.tbl_tamu.findFirst({
    where: {
      nik: nik,
    },
  });
  if (!tamu) throw new NotFoundError("Tamu tidak ditemukan");
  const qrcodetoken = createJWT(createQrcodeGuest(tamu));

  const result = await prisma.tbl_qrcode.create({
    data: {
      url: qrcodetoken,
      expired: new Date(expired),
    },
  });

  const update = await prisma.tbl_tamu.update({
    where: {
      nik: nik,
    },
    data: {
      id_qrcode: result.id_qrcode,
    },
  });
  await generateQR(update, result.url);
  await otpMail(tamu.email, tamu);
  return result;
};

const getAllQrcode = async () => {
  const result = await prisma.tbl_qrcode.findMany();

  return result;
};

const getQrcodeByUrl = async (url) => {
  const result = await prisma.tbl_qrcode.findFirst({
    where: {
      url: url,
    },
  });

  return result;
};

const generateQr = async (req) => {
  const { id } = req.params;
  const result = await prisma.tbl_qrcode.findFirst({
    where: {
      id_qrcode: parseInt(id),
    },
  });

  if (!result) throw new NotFoundError(`Tidak ada Qr dengan id :  ${id}`);

  const fileDirectory = path.join(
    __dirname,
    "../../../public/images/qrcodes",
    `${id}.jpg`
  );

  return fileDirectory;
};

// jangan lupa export checkingImage
module.exports = {
  createQrcodePersonel,
  getAllQrcode,
  createQrcodeTamu,
  getQrcodeByUrl,
  generateQr,
};
