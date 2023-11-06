const Joi = require('joi');
const validateStatusPers = (data) => {
  const schema = Joi.object({
    ur_status: Joi.string().min(3).max(30).uppercase().required().messages({
      'string.base': `Status Pers harus berupa teks`,
      'string.empty': `Status Pers tidak boleh kosong`,
      'string.min': `Status Pers harus memiliki panjang minimal {#limit} karakter`,
      'string.max': `Status Pers harus memiliki panjang maksimal {#limit} karakter`,
      'string.uppercase': `Status Pers harus berupa huruf kapital (uppercase)`,
      'any.required': `Status Pers tidak boleh kosong`
    }),
  });

  return schema.validate(data);
};

module.exports = validateStatusPers;