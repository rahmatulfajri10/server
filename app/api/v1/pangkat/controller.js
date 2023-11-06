const { StatusCodes } = require('http-status-codes');
const  validatePangkat  = require('./model');
const { getAllPangkat, createPangkat } = require('../../../services/prisma/pangkat');
const { BadRequestError } = require('../../../errors');

const create = async (req, res, next) => {
  try{
    const { ur_pkt } = req.body;
    // Validasi data menggunakan Joi
    const { error } = validatePangkat({ ur_pkt: ur_pkt });
    if (error) {
      throw new BadRequestError(error.details[0].message);
    }

    
    // Simpan data ke basis data menggunakan Prisma
    const result = await createPangkat(ur_pkt);
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
    const result = await getAllPangkat();
    res.status(StatusCodes.OK).json({
        data: result,
    });
  }catch(err){
    next(err);  
  } 
};


module.exports = {index, create};