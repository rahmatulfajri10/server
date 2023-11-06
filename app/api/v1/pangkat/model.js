const Joi = require('joi');
const validatePangkat = (data) => {
  const schema = Joi.object({
    ur_pkt: Joi.string().min(3).max(30).uppercase().required().messages({
      'string.base': `Pangkat harus berupa teks`,
      'string.empty': `Pangkat tidak boleh kosong`,
      'string.min': `Pangkat harus memiliki panjang minimal {#limit} karakter`,
      'string.max': `Pangkat harus memiliki panjang maksimal {#limit} karakter`,
      'string.uppercase': `Pangkat harus berupa huruf kapital (uppercase)`,
      'any.required': `Pangkat tidak boleh kosong`
    }),
  });

  return schema.validate(data);
};

module.exports = validatePangkat;