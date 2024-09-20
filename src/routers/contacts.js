import { Router } from 'express';
import {
  createContactController,
  deleteContactController,
  getContactsController,
  getStudentsByIdController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getContactsController));

router.get('/contacts/:contactId', ctrlWrapper(getStudentsByIdController));

router.post('/contacts', ctrlWrapper(createContactController));

router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));

export default router;
