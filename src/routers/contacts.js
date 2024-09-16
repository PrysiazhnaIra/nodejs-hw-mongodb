import { Router } from 'express';
import {
  getContactsController,
  getStudentsByIdController,
} from '../controllers/contacts.js';

const router = Router();

router.get('/contacts', getContactsController);

router.get('/contacts/:contactId', getStudentsByIdController);

export default router;
