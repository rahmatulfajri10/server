const prisma = require('../../db/index')
const { BadRequestError } = require('../../errors')
const getAllStatusPers = async () => {
    const result = await prisma.tbl_status_pers.findMany()
    return result
}

const createStatusPers = async (data) => {
    // Cek apakah data sudah ada di basis data
    const isExist = await prisma.tbl_status_pers.findFirst({
      where: {
        ur_status: data,
      },
    });
    if (isExist === null) {
      const result = await prisma.tbl_status_pers.create({
        data: {
          ur_status: data,
        },
      });
      return result;
    } else {
      throw new BadRequestError('Satminkal tersebut sudah ada di database');
    }
  
    
}

module.exports = { getAllStatusPers, createStatusPers }