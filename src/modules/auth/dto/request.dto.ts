import Joi from "joi";

export const registerSchema = Joi.object({
  username: Joi.string().min(5).max(255).required(),
  password: Joi.string().min(5).max(255).required(),
  firstName: Joi.string().min(2).max(255).required(),
  lastName: Joi.string().min(2).max(255).required(),
});

export const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});
