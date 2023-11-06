const prisma = require('../../db/index')
const { BadRequestError } = require('../../errors')
const getAllKorps = async () => {
    const result = await prisma.tbl_korps.findMany()
    return result
}

const createKorps = async (data) => {
    // Cek apakah data sudah ada di basis data
    const isExist = await prisma.tbl_korps.findFirst({
      where: {
        ur_korps: data,
      },
    });
    if (isExist === null) {
      const result = await prisma.tbl_korps.create({
        data: {
          ur_korps: data,
        },
      });
      return result;
    } else {
      throw new BadRequestError('Korps tersebut sudah ada di database');
    }
  
    
}

module.exports = { getAllKorps, createKorps }