const prisma = require('../../db/index')
const { BadRequestError } = require('../../errors')

const getAllKunjunganTamu = async () => {
    const result = await prisma.tbl_log_tamu.findMany()
    return result
}

const getAllKunjunganPersonel = async () => {
    const result = await prisma.tbl_log_pers.findMany()
    return result
}

const createLogTamuMasuk = async (tamu) => {
    const result = await prisma.tbl_log_tamu.create({
        data: {
            nik: tamu.nik,
            in_out: 1,
            id_s_kunjungan: 1
        },
    });
    return result
    
}

const createLogTamuKeluar = async (tamu) => {
    const result = await prisma.tbl_log_tamu.create({
        data: {
            nik: tamu.nik,
            in_out: 0,
            id_s_kunjungan: 2
        },
    });
    return result
    
}

const createLogPersMasuk = async (pers) => {
    const result = await prisma.tbl_log_pers.create({
        data: {
            nopers: pers.nopers,
            in_out: 1,
            id_s_kunjungan: 1
        },
    });
    return result
}

const createLogPersKeluar = async (pers) => {
    const result = await prisma.tbl_log_pers.create({
        data: {
            nopers: pers.nopers,
            in_out: 0,
            id_s_kunjungan: 2
        },
    });
    return result
}
module.exports = {  
    getAllKunjunganTamu,
    getAllKunjunganPersonel,
    createLogTamuMasuk,
    createLogPersMasuk,
    createLogTamuKeluar,
    createLogPersKeluar
}


