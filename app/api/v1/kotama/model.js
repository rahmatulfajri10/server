const Joi = require('joi');
const validateKotama = (data) => {
  const schema = Joi.object({
    ur_ktm: Joi.string().min(3).max(30).uppercase().required().messages({
      'string.base': `Kotama harus berupa teks`,
      'string.empty': `Kotama tidak boleh kosong`,
      'string.min': `Kotama harus memiliki panjang minimal {#limit} karakter`,
      'string.max': `Kotama harus memiliki panjang maksimal {#limit} karakter`,
      'string.uppercase': `Kotama harus berupa huruf kapital (uppercase)`,
      'any.required': `Kotama tidak boleh kosong`
    }),
  });

  return schema.validate(data);
};

module.exports = validateKotama;