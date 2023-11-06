const Joi = require('joi');
const validateUser = (data) => {
  const schema = Joi.object({
    // Definisi validasi lainnya
    username: Joi.string().min(3).max(20).required().messages({
      'string.min': 'NRP minimal 3 karakter',
      'string.max': 'NRP maksimal 20 karakter',
      'string.empty': 'NRP tidak boleh kosong',
      'any.required': 'NRP harus diisi',
    }),
    password: Joi.string().min(3).max(50).required().messages({
      'string.min': 'Nama minimal 3 karakter',
      'string.max': 'Nama maksimal 50 karakter',
      'string.empty': 'Nama tidak boleh kosong',
      'any.required': 'Nama harus diisi',
    }),
    kd_role: Joi.string().min(3).max(50).required().messages({
        'string.min': 'Nama minimal 3 karakter',
        'string.max': 'Nama maksimal 50 karakter',
        'string.empty': 'Nama tidak boleh kosong',
        'any.required': 'Nama harus diisi',
      }),
    nopers: Joi.string().min(3).max(50).required().messages({
      'string.min': 'Nama minimal 3 karakter',
      'string.max': 'Nama maksimal 50 karakter',
      'string.empty': 'Nama tidak boleh kosong',
      'any.required': 'Nama harus diisi',
    }),

  });

  return schema.validate(data);
};

module.exports = validateUser;