const Joi = require('joi');
const validateImg = (data) => {
  const schema = Joi.object({
    url: Joi.string().min(3).max(30).required().messages({
      'string.base': `url harus berupa teks`,
      'string.empty': `url tidak boleh kosong`,
      'any.required': `url tidak boleh kosong`
    }),
  });

  return schema.validate(data);
};

module.exports = validateImg;