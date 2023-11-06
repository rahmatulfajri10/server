const { StatusCodes } = require('http-status-codes');
const { createSatminkal, getAllSatminkal } = require('../../../services/prisma/satminkal');
const  validateSmkl  = require('./model');
const { BadRequestError } = require('../../../errors');

const create = async (req, res, next) => {
  try{
    const { ur_smkl } = req.body;
    // Validasi data menggunakan Joi
    const { error } = validateSmkl({ ur_smkl: ur_smkl });
    if (error) {
      throw new BadRequestError(error.details[0].message);
    }

    // Simpan data ke basis data menggunakan Prisma
    const result = await createSatminkal(ur_smkl);
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
    const result = await getAllSatminkal();
    res.status(200).json({
        data: result,
    });
  }catch(err){
    next(err);  
  } 
};


module.exports = {index, create};