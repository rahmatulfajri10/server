const prisma = require("../../db");
const { BadRequestError, NotFoundError } = require("../../errors");
const { checkingImage } = require("./image");

const getAllTamu = async (req) => {
    const { keyword } = req.query;
    let condition = {};
    
    if(keyword) {
        condition = { nm_tamu: { contains: keyword, mode: "insensitive" } }; 
    }    
    const result = await prisma.tbl_tamu.findMany({
        where: condition,
        select:{
            nik: true,
            nm_tamu: true,
            img: {
                select: {
                    id_img: true,
                    url: true,
                },
            },
            telp: true,
            instansi: true,
            pekerjaan: true,
            id_qrcode: true,
            ket_tamu: true,
            email: true,
        }
        
    });    
    return result
}

const createTamu = async (req) => {
    const { nik, nm_tamu, id_img, telp, instansi, pekerjaan, ket_tamu, email} = req.body;

    await checkingImage(id_img);

    const check = await prisma.tbl_tamu.findFirst({
        where: {
            nik: nik,
        },
    });

    if (check) throw new BadRequestError('Tamu tersebut sudah ada di database');
    const result = await prisma.tbl_tamu.create({
        data: {
            nik: nik,
            nm_tamu: nm_tamu,
            instansi: instansi,
            pekerjaan: pekerjaan,  
            ket_tamu: ket_tamu,
            telp: telp,
            id_img: parseInt(id_img),
            email: email,
        },
    });

    return result;
}

const getOneTamu = async (req) => {
    const { nik } = req.params;

    const result = await prisma.tbl_tamu.findFirst({
        where: {
            nik: nik,
        },
        select:{
            nik: true,
            nm_tamu: true,
            img: {
                select: {
                    id_img: true,
                    url: true,
                },
            },
            telp: true,
            instansi: true,
            pekerjaan: true,
            id_qrcode: true,
            ket_tamu: true,
            email: true,
        }
    });

    if (!result) throw new NotFoundError(`Tidak ada Tamu dengan Nomor Tamu :  ${nik}`);

    return result;
}

const updateTamu = async (req) => {
    const { nik } = req.params;
    const { nm_tamu, id_img, telp, instansi, pekerjaan, ket_tamu, email } = req.body;
    
    await checkingImage(id_img);

    const check = await prisma.tbl_tamu.findFirst({
        where: {
            nik: nik,
        },
    });

    if (!check) throw new NotFoundError(`Tidak ada Tamu dengan Nomor Tamu :  ${nik}`);
    const result = await prisma.tbl_tamu.update({
        where: {
            nik: nik,
        },
        data: {
            nm_tamu: nm_tamu,
            id_img: parseInt(id_img),
            instansi: instansi,
            pekerjaan: pekerjaan,
            ket_tamu: ket_tamu,
            telp: telp,
            email: email,
        },
    });

    return result;
}

const deleteTamu = async (req) => {
    const { nik } = req.params;

    const check = await prisma.tbl_tamu.findFirst({
        where: {
            nik: nik,
        },
    });

    if (!check) throw new NotFoundError(`Tidak ada Tamu dengan Nomor Tamu :  ${nik}`);

    const result = await prisma.tbl_tamu.delete({
        where: {
            nik: nik,
        },
    });

    return result;
}

const checkingTamu = async (nik) => {
    const result = await prisma.tbl_tamu.findFirst({
        where: {
            nik: nik,
        },
    });

    if (!result) throw new NotFoundError(`Tidak ada Tamu dengan Nomor Tamu :  ${nik}`);

    return result;
}

module.exports = { getAllTamu, createTamu, getOneTamu, updateTamu, deleteTamu, checkingTamu }