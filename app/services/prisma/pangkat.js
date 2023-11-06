const prisma = require('../../db/index')
const { BadRequestError } = require('../../errors')
const getAllPangkat = async () => {
    const result = await prisma.tbl_pangkat.findMany()
    return result
}

const createPangkat = async (data) => {
    // Cek apakah data sudah ada di basis data
    const isExist = await prisma.tbl_pangkat.findFirst({
      where: {
        ur_pkt: data,
      },
    });
    if (isExist === null) {
      const result = await prisma.tbl_pangkat.create({
        data: {
          ur_pkt: data,
        },
      });
      return result;
    } else {
      throw new BadRequestError('Pangkat tersebut sudah ada di database');
    }
  
    
}

module.exports = { getAllPangkat, createPangkat }