const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../../../errors');
const { getQrcodeByUrl } = require('../../../services/prisma/qrcode');
const { isQrCodeValid } = require('../../../utils');
const {   createLogTamuKeluar, createLogPersMasuk, createLogTamuMasuk, createLogPersKeluar } = require('../../../services/prisma/logkunjungan');


const logMasuk = async (req, res, next) => {
    try {
        const {url} = req.body;
        const qrcode = await getQrcodeByUrl(url);
        if (!qrcode) throw new BadRequestError("QR Code tidak ditemukan");
        const payload = isQrCodeValid({url})
        if (payload.nik){
            const result = await createLogTamuMasuk(payload);
            res.status(StatusCodes.OK).json({
                status: 'success',
                data: result,
            });

        }else{
            const result = await createLogPersMasuk(payload);
            res.status(StatusCodes.OK).json({
                status: 'success',
                data: result,
            });
        }
        
    } catch (err) {
        next(err);
    }
}

const logKeluar = async (req, res, next) => {
    try {
        const {url} = req.body;
        const qrcode = await getQrcodeByUrl(url);
        if (!qrcode) throw new BadRequestError("QR Code tidak ditemukan");
        const payload = isQrCodeValid({url})
        if (payload.nik){
            const result = await createLogTamuKeluar(payload);
            res.status(StatusCodes.OK).json({
                status: 'success',
                data: result,
            });

        }else{
            const result = await createLogPersKeluar(payload);
            res.status(StatusCodes.OK).json({
                status: 'success',
                data: result,
            });
        }
        
    } catch (err) {
        next(err);
    }
}

module.exports = {
    logMasuk,
    logKeluar
};
