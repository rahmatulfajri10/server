const Joi = require('joi');
const validatePersonel = (data) => {
  const schema = Joi.object({
    // Definisi validasi lainnya
    nopers: Joi.string().min(3).max(20).required().messages({
      'string.min': 'NRP minimal 3 karakter',
      'string.max': 'NRP maksimal 20 karakter',
      'string.empty': 'NRP tidak boleh kosong',
      'any.required': 'NRP harus diisi',
    }),
    nm_pers: Joi.string().min(3).max(50).required().messages({
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
    id_img: Joi.number().integer().required().messages({
      'number.base': 'Gambar harus berupa angka',
      'number.empty': 'Gambar tidak boleh kosong',
      'any.required': 'Gambar harus diisi',
    }),
    email: Joi.string().email().required().messages({
      'string.email': 'Email tidak valid',
      'string.empty': 'Email tidak boleh kosong',
      'any.required': 'Email harus diisi',
    }),

  });

  return schema.validate(data);
};

module.exports = validatePersonel;