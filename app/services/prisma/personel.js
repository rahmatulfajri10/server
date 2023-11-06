const prisma = require("../../db");
const { BadRequestError, NotFoundError } = require("../../errors");
const { checkingImage } = require("./image");

const getAllPersonel = async (req) => {
    const { keyword } = req.query;
    let condition = {};
    
    if(keyword) {
        condition = { nm_pers: { contains: keyword, mode: "insensitive" } }; 
    }    
    const result = await prisma.tbl_personel.findMany({
        where: condition,
        select:{
            nopers: true,
            nm_pers: true,
            pkt: {
                select: {
                    ur_pkt: true,
                }
            },
            korps: {
                select: {
                    ur_korps: true,
                }
            },
            ktm: {
                select: {
                    ur_ktm: true,
                }
            },
            smkl: {
                select: {
                    ur_smkl: true,
                }
            },
            status  : {
                select: {
                    ur_status: true,
                }
            },
            img: {
                select: {
                    id_img: true,
                    url: true,
                },
            },
            telp: true,
            id_qrcode: true,
            email: true,
        }
        
    });    
    return result
}

const createPersonel = async (req) => {
    const { nopers, nm_pers, id_img, kd_pkt, kd_korps, kd_ktm, kd_smkl, kd_status, telp, email } = req.body;

    await checkingImage(id_img);

    const check = await prisma.tbl_personel.findFirst({
        where: {
            nopers: nopers,
        },
    });

    if (check) throw new BadRequestError('Personel tersebut sudah ada di database');


    const pkt = await prisma.tbl_pangkat.findFirst({
        where: {
            ur_pkt: kd_pkt,
        },
    });


    const korps = await prisma.tbl_korps.findFirst({
        where: {
            ur_korps: kd_korps,
        },
    });
    const ktm = await prisma.tbl_kotama.findFirst({
        where: {
            ur_ktm: kd_ktm,
        },
    });
    const smkl = await prisma.tbl_smkl.findFirst({
        where: {
            ur_smkl: kd_smkl,
        },
    });
    const status = await prisma.tbl_status_pers.findFirst({
        where: {
            ur_status: kd_status,
        },
    });
    const result = await prisma.tbl_personel.create({
        data: {
            nopers: nopers,
            nm_pers: nm_pers,
            kd_pkt: pkt?.kd_pkt,
            kd_korps: korps?.kd_korps,
            kd_ktm: ktm?.kd_ktm,
            kd_smkl: smkl?.kd_smkl,
            kd_status: status?.kd_status,
            telp: telp,
            id_img: parseInt(id_img),
            email: email,
        },
    });
    console.log(result);

    return result;
}

const getOnePersonel = async (req) => {
    const { nopers } = req.params;

    const result = await prisma.tbl_personel.findFirst({
        where: {
            nopers: nopers,
        },
        select:{
            nopers: true,
            nm_pers: true,
            pkt: {
                select: {
                    ur_pkt: true,
                }
            },
            korps: {
                select: {
                    ur_korps: true,
                }
            },
            ktm: {
                select: {
                    ur_ktm: true,
                }
            },
            smkl: {
                select: {
                    ur_smkl: true,
                }
            },
            status  : {
                select: {
                    ur_status: true,
                }
            },
            img: {
                select: {
                    id_img: true,
                    url: true,
                },
            },
            telp: true,
            email: true,
        }
    });

    if (!result) throw new NotFoundError(`Tidak ada Personel dengan Nomor Personel :  ${nopers}`);

    return result;
}

const updatePersonel = async (req) => {
    const { nopers } = req.params;
    const { nm_pers, id_img, kd_pkt, kd_korps, kd_ktm,kd_smkl, kd_status, telp, email } = req.body;

    await checkingImage(id_img);

    const check = await prisma.tbl_personel.findFirst({
        where: {
            nopers: nopers,
        },
    });

    if (!check) throw new NotFoundError(`Tidak ada Personel dengan Nomor Personel :  ${nopers}`);


    const pkt = await prisma.tbl_pangkat.findFirst({
        where: {
            ur_pkt: kd_pkt,
        },
    });

    const korps = await prisma.tbl_korps.findFirst({
        where: {
            ur_korps: kd_korps,
        },
    });

    const ktm = await prisma.tbl_kotama.findFirst({
        where: {
            ur_ktm: kd_ktm,
        },
    });

    const smkl = await prisma.tbl_smkl.findFirst({
        where: {
            ur_smkl: kd_smkl,
        },
    });

    const status = await prisma.tbl_status_pers.findFirst({
        where: {
            ur_status: kd_status,
        },
    });

    const result = await prisma.tbl_personel.update({
        where: {
            nopers: nopers,
        },
        data: {
            nm_pers: nm_pers,
            id_img: parseInt(id_img),
            kd_pkt: pkt?.kd_pkt,
            kd_korps: korps?.kd_korps,
            kd_ktm: ktm?.kd_ktm,
            kd_smkl: smkl?.kd_smkl,
            kd_status: status?.kd_status,
            telp: telp,
            email: email,
        },
    });

    return result;
}

const deletePersonel = async (req) => {
    const { nopers } = req.params;

    const check = await prisma.tbl_personel.findFirst({
        where: {
            nopers: nopers,
        },
    });

    if (!check) throw new NotFoundError(`Tidak ada Personel dengan Nomor Personel :  ${nopers}`);

    const result = await prisma.tbl_personel.delete({
        where: {
            nopers: nopers,
        },
    });

    return result;
}

const checkingPersonel = async (nopers) => {
    const result = await prisma.tbl_personel.findFirst({
        where: {
            nopers: nopers,
        },
    });

    if (!result) throw new NotFoundError(`Tidak ada Personel dengan Nomor Personel :  ${nopers}`);

    return result;
}

module.exports = { getAllPersonel, createPersonel, getOnePersonel, updatePersonel, deletePersonel, checkingPersonel }