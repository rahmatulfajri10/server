const  validateKorps  = require('./model');
const { StatusCodes } = require('http-status-codes');
const { getAllKorps, createKorps } = require('../../../services/prisma/korps');
const { BadRequestError } = require('../../../errors');

const create = async (req, res, next) => {
  try{
    const { ur_korps } = req.body;
    // Validasi data menggunakan Joi
    const { error } = validateKorps({ ur_korps: ur_korps });
    if (error) {
      throw new BadRequestError(error.details[0].message);
    }

    // Simpan data ke basis data menggunakan Prisma
    const result = await createKorps(ur_korps);
    res.status(StatusCodes.ACCEPTED).json({
        status: 'success',
        data: result,
    });
  }catch(err){
    next(err);  
  } 
};

const index = async (req, res, next) => {
  try{
    const result = await getAllKorps();
    res.status(StatusCodes.OK).json({
        data: result,
    });
  }catch(err){
    next(err);  
  } 
};


module.exports = {index, create};