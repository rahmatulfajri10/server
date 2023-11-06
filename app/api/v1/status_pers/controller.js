const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../../../errors');
const validateStatusPers = require('./model');
const { getAllStatusPers, createStatusPers } = require('../../../services/prisma/statusPers');

const create = async (req, res, next) => {
  try{
    const { ur_status } = req.body;
    // Validasi data menggunakan Joi
    const { error } = validateStatusPers({ ur_status: ur_status });
    if (error) {
      throw new BadRequestError(error.details[0].message);
    }

    // Simpan data ke basis data menggunakan Prisma
    const result = await createStatusPers(ur_status);
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
    const result = await getAllStatusPers();
    res.status(200).json({
        data: result,
    });
  }catch(err){
    next(err);  
  } 
};


module.exports = {index, create};