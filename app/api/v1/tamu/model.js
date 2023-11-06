const Joi = require('joi');
const validateTamu = (data) => {
  const schema = Joi.object({
    // Definisi validasi lainnya
    nik: Joi.string().min(3).max(20).required().messages({
      'string.min': 'nik minimal 3 karakter',
      'string.max': 'nik maksimal 20 karakter',
      'string.empty': 'nik tidak boleh kosong',
      'any.required': 'nik harus diisi',
    }),
    nm_tamu: Joi.string().min(3).max(50).required().messages({
      'string.min': 'Nama minimal 3 karakter',
      'string.max': 'Nama maksimal 50 karakter',
      'string.empty': 'Nama tidak boleh kosong',
      'any.required': 'Nama harus diisi',
    }),
    telp: Joi.string().min(3).max(20).required().messages({
      'string.min': 'Nomor Telepon minimal 3 karakter',
      'string.max': 'Nomor Telepon maksimal 20 karakter',
      'string.empty': 'Nomor Telepon tidak boleh kosong',
      'any.required': 'Nomor Telepon harus diisi',
    }),
    instansi: Joi.string().min(3).max(20).required().messages({
      'string.min': 'Instansi minimal 3 karakter',
      'string.max': 'Instansi maksimal 20 karakter',
      'string.empty': 'Instansi tidak boleh kosong',
      'any.required': 'Instansi harus diisi',
    }),
    pekerjaan: Joi.string().min(3).max(20).required().messages({
      'string.min': 'Pekerjaan minimal 3 karakter',
      'string.max': 'Pekerjaan maksimal 20 karakter',
      'string.empty': 'Pekerjaan tidak boleh kosong',
      'any.required': 'Pekerjaan harus diisi',
    }),
    ket_tamu: Joi.string().min(3).max(20).required().messages({
      'string.min': 'Status minimal 3 karakter',
      'string.max': 'Status maksimal 20 karakter',
      'string.empty': 'Status tidak boleh kosong',
      'any.required': 'Status harus diisi',
    }),
    id_img: Joi.number().integer().required().messages({
      'number.base': 'Gambar harus berupa angka',
      'number.empty': 'Gambar tidak boleh kosong',
      'any.required': 'Gambar harus diisi',
    }),
    email : Joi.string().email().required().messages({
      'string.email': 'Email tidak valid',
      'string.empty': 'Email tidak boleh kosong',
      'any.required': 'Email harus diisi',
    }),

  });

  return schema.validate(data);
};

module.exports = validateTamu;