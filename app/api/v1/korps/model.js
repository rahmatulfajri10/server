const Joi = require('joi');
const validateKorps = (data) => {
  const schema = Joi.object({
    ur_korps: Joi.string().min(1).max(15).uppercase().required().messages({
      'string.base': `Korps harus berupa teks`,
      'string.empty': `Korps tidak boleh kosong`,
      'string.min': `Korps harus memiliki panjang minimal {#limit} karakter`,
      'string.max': `Korps harus memiliki panjang maksimal {#limit} karakter`,
      'string.uppercase': `Korps harus berupa huruf kapital (uppercase)`,
      'any.required': `Korps tidak boleh kosong`
    }),
  });

  return schema.validate(data);
};

module.exports = validateKorps;