import createHttpError from 'http-errors';
import { Sessions } from '../db/models/session.js';
import { User } from '../db/models/user.js';

export const authenticate = async (req, res, next) => {
  const authHeader = req.get('authorization');

  // Перевірка наявності заголовка Authorization
  if (!authHeader) {
    return next(createHttpError(401, 'Please provide Authorization header!'));
  }

  // Розділення заголовка на Bearer і токен
  const [bearer, token] = authHeader.split(' ');

  // Перевірка правильності типу Bearer та наявності токена
  if (bearer !== 'Bearer' || !token) {
    return next(createHttpError(401, 'Auth header should be of type Bearer'));
  }
  // Пошук сесії за токеном
  const session = await Sessions.findOne({
    accessToken: token,
  });

  // Перевірка наявності сесії
  if (!session) {
    return next(createHttpError(401, 'Session not found'));
  }

  // Перевірка чи токен не закінчився
  const isAccessTokenExpired =
    new Date() > new Date(session.accessTokenValidUntil);

  if (isAccessTokenExpired) {
    return next(createHttpError(401, 'Access token expired'));
  }

  // Пошук користувача за ідентифікатором
  const user = await User.findById(session.userId);

  if (!user) {
    next(createHttpError(401));
    return;
  }

  // Збереження користувача в запиті для подальшого використання
  req.user = user;

  next();
};
