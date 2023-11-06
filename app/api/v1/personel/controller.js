const { StatusCodes } = require('http-status-codes');
const { createPersonel, getAllPersonel, getOnePersonel, updatePersonel, deletePersonel } = require('../../../services/prisma/personel');
const validatePersonel = require('./model');

const create = async (req, res) => {
    try {
        const { nopers, nm_pers, id_img, telp, email  } = req.body;
        
        // Validasi data menggunakan Joi
        const { error } = validatePersonel({ nopers: nopers, nm_pers: nm_pers, id_img: id_img, telp: telp, email: email });
        
        if (error) {
            throw new BadRequestError(error.details[0].message);
        }


        const result = await createPersonel(req);

        res.status(StatusCodes.CREATED).json({
            status: 'success',
            data: result,
        });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            status: 'error',
            message: error.message,
        });
    }
}

const index = async (req, res) => {
    try {
        const result = await getAllPersonel(req);

        res.status(StatusCodes.OK).json({
            status: 'success',
            data: result,
        });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            status: 'error',
            message: error.message,
        });
    }
}

const find = async (req, res) => {
    try {
        const result = await getOnePersonel(req);

        res.status(StatusCodes.OK).json({
            status: 'success',
            data: result,
        });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            status: 'error',
            message: error.message,
        });
    }
}

const update = async (req, res) => {
    try {
        const { nm_pers, id_img, telp, email  } = req.body;
        const { nopers } = req.params;
        
        // Validasi data menggunakan Joi
        const { error } = validatePersonel({ nopers: nopers, nm_pers: nm_pers, id_img: id_img, telp: telp, email: email });
        
        if (error) {
            throw new BadRequestError(error.details[0].message);
        }
        
        const result = await updatePersonel(req);

        res.status(StatusCodes.OK).json({
            status: 'success',
            data: result,
        });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            status: 'error',
            message: error.message,
        });
    }
}

const destroy = async (req, res) => {
    try {
        const result = await deletePersonel(req);

        res.status(StatusCodes.OK).json({
            status: 'success',
            data: result,
        });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            status: 'error',
            message: error.message,
        });
    }
}

module.exports = {
    create,
    index,
    find,
    update,
    destroy,
}

