import Joi from 'joi';

export const registerUserSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6).max(20),
});

export const LoginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const sendResetEmailSchema = Joi.object({
  email: Joi.string().email().required(),
});
