import { User } from '../db/models/user.js';
import createHttpError from 'http-errors';

export const registerUser = async (payload) => {
  let user = await User.find({ email: payload.email });

  if (user) {
    throw createHttpError(409, 'Email in use');
  }

  user = await User.create(payload);

  return user;
};
