import Joi from "joi";

export const birthdateValidator = Joi.object({
  birthdate: Joi.string().required(),
});
