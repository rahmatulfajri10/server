const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../../../errors');
const { getAllKotama, createKotama } = require('../../../services/prisma/kotama');
const  validateKotama  = require('./model');

const create = async (req, res, next) => {
  try{
    const { ur_ktm } = req.body;
    // Validasi data menggunakan Joi
    const { error } = validateKotama({ ur_ktm: ur_ktm });
    if (error) {
      throw new BadRequestError(error.details[0].message);
    }

    // Simpan data ke basis data menggunakan Prisma
    const result = await createKotama(ur_ktm);
    res.status(StatusCodes.CREATED).json({
        status: 'success',
        data: result,
    });
  }catch(err){
    next(err);  
  } 
};

const index = async (req, res, next) => {
  try{
  
    const result = await getAllKotama();
    res.status(StatusCodes.OK).json({
        data: result,
    });
  }catch(err){
    next(err);  
  } 
};


module.exports = {index, create};