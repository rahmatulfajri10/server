const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../../../errors');
const validateUser = require('./model');
const {createUser} = require('../../../services/prisma/user');

const create = async (req, res, next) => {
    try{
        const { username, password,kd_role, nopers } = req.body;
        // Validasi data menggunakan Joi
        const { error } = validateUser({ username: username, password: password,kd_role: kd_role, nopers: nopers });
        if (error) {
            throw new BadRequestError(error.details[0].message);
        }

        // Simpan data ke basis data menggunakan Prisma
        const result = await createUser(req);
        res.status(StatusCodes.ACCEPTED).json({
            status: 'success',
            data: result,
        });
    }
    catch(err){
        next(err);
    }
}

module.exports = {
    create,
};

