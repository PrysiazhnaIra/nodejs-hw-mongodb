import { User } from '../db/models/user.js';
import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { Sessions } from '../db/models/session.js';
import {
  ACCESS_TOKEN_LIVE_TIME,
  REFRESH_TOKEN_LIVE_TIME,
} from '../constants/index.js';
import { randomBytes } from 'crypto';

export const registerUser = async (payload) => {
  let user = await User.findOne({ email: payload.email });

  if (user) {
    throw createHttpError(409, 'Email in use');
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10);

  user = await User.create({ ...payload, password: hashedPassword });

  return user;
};

export const loginUser = async (payload) => {
  const user = await User.findOne({ email: payload.email });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }
  const isEqual = await bcrypt.compare(payload.password, user.password);

  if (!isEqual) {
    throw createHttpError(401, 'Unauthorized');
  }

  await Sessions.deleteOne({ userId: user._id });

  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return await Sessions.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + ACCESS_TOKEN_LIVE_TIME),
    refreshTokenValidUntil: new Date(Date.now() + REFRESH_TOKEN_LIVE_TIME),
  });
};

export const logoutUser = async (sessionId) => {
  await Sessions.deleteOne({ _id: sessionId });
};

const createSession = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + ACCESS_TOKEN_LIVE_TIME),
    refreshTokenValidUntil: new Date(Date.now() + REFRESH_TOKEN_LIVE_TIME),
  };
};

export const refreshUsersSession = async ({ sessionId, refreshToken }) => {
  const session = await Sessions.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  const isSessionTokenExpired =
    new Date() > new Date(session.refreshTokenValidUntil);

  if (isSessionTokenExpired) {
    throw createHttpError(401, 'Session token expired');
  }

  const newSession = createSession();

  await Sessions.deleteOne({ _id: sessionId, refreshToken });

  return await Sessions.create({
    userId: session.userId,
    ...newSession,
  });
};
