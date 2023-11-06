const prisma = require('../../db/index')
const { BadRequestError } = require('../../errors')
const getAllKotama = async () => {
    const result = await prisma.tbl_kotama.findMany()
    return result
}

const createKotama = async (data) => {
    // Cek apakah data sudah ada di basis data
    const isExist = await prisma.tbl_kotama.findFirst({
      where: {
        ur_ktm: data,
      },
    });
    if (isExist === null) {
      const result = await prisma.tbl_kotama.create({
        data: {
          ur_ktm: data,
        },
      });
      return result;
    } else {
      throw new BadRequestError('Kotama tersebut sudah ada di database');
    }
  
    
}

module.exports = { getAllKotama, createKotama }