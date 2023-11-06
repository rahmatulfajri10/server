const prisma = require('../../db/index')
const { BadRequestError } = require('../../errors')
const getAllSatminkal = async () => {
    const result = await prisma.tbl_smkl.findMany()
    return result
}

const createSatminkal = async (data) => {
    // Cek apakah data sudah ada di basis data
    const isExist = await prisma.tbl_smkl.findFirst({
      where: {
        ur_smkl: data,
      },
    });
    if (isExist === null) {
      const result = await prisma.tbl_smkl.create({
        data: {
          ur_smkl: data,
        },
      });
      return result;
    } else {
      throw new BadRequestError('Satminkal tersebut sudah ada di database');
    }
  
    
}

module.exports = { getAllSatminkal, createSatminkal }