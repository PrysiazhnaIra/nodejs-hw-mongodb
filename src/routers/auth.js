import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  LoginUserSchema,
  registerUserSchema,
  sendResetEmailSchema,
} from '../validation/auth.js';
import {
  loginUserController,
  logoutUserController,
  refreshUserSessionController,
  registerUserController,
  sendResetEmailController,
} from '../controllers/auth.js';

const router = Router();

router.post(
  '/send-reset-email',
  validateBody(sendResetEmailSchema),
  ctrlWrapper(sendResetEmailController),
);

router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

router.post(
  '/login',
  validateBody(LoginUserSchema),
  ctrlWrapper(loginUserController),
);

router.post('/logout', ctrlWrapper(logoutUserController));

router.post('/refresh', ctrlWrapper(refreshUserSessionController));

export default router;
