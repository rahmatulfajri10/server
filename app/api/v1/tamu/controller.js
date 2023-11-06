const { StatusCodes } = require('http-status-codes');
const validateTamu = require('./model');
const { createTamu, getAllTamu, getOneTamu, updateTamu, deleteTamu } = require('../../../services/prisma/tamu');
const { BadRequestError } = require('../../../errors');

const create = async (req, res) => {
    try {
        const { nik, nm_tamu, telp, id_img, instansi, pekerjaan, ket_tamu, email } = req.body;
        // Validasi data menggunakan Joi
        const { error } = validateTamu({ nik: nik, nm_tamu: nm_tamu, telp: telp, id_img: id_img, instansi: instansi, pekerjaan: pekerjaan, ket_tamu: ket_tamu, email: email });
        if (error) {
            throw new BadRequestError(error.details[0].message);
        }

        

        const result = await createTamu(req);

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
        
        const result = await getAllTamu(req);

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
        const result = await getOneTamu(req);

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
        const { nm_tamu, telp, id_img, instansi, pekerjaan, ket_tamu, email } = req.body;
        const {nik} = req.params;
        // Validasi data menggunakan Joi
        const { error } = validateTamu({ nik: nik, nm_tamu: nm_tamu, telp: telp, id_img: id_img, instansi: instansi, pekerjaan: pekerjaan, ket_tamu: ket_tamu , email: email});
        if (error) {
            throw new BadRequestError(error.details[0].message);
        }
        
        const result = await updateTamu(req);

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
        const result = await deleteTamu(req);

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

