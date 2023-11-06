const Joi = require('joi');
const validateSmkl = (data) => {
  const schema = Joi.object({
    ur_smkl: Joi.string().min(3).max(30).uppercase().required().messages({
      'string.base': `Satminkal harus berupa teks`,
      'string.empty': `Satminkal tidak boleh kosong`,
      'string.min': `Satminkal harus memiliki panjang minimal {#limit} karakter`,
      'string.max': `Satminkal harus memiliki panjang maksimal {#limit} karakter`,
      'string.uppercase': `Satminkal harus berupa huruf kapital (uppercase)`,
      'any.required': `Satminkal tidak boleh kosong`
    }),
  });

  return schema.validate(data);
};

module.exports = validateSmkl;