import { Router } from "express";
import { isAdmin } from '../public/js/authMiddleware.js';
import { apiUsersGetUsers, apiUsersChangeRole, apiUsersUploadDocuments, apiUsersDeleteInactiveUsers, apiUsersDeleteUser } from '../controllers/apiUsers.controller.js'
import upload from "../middlewares/multer.js";


const router = Router();
const multer = upload

router.get('/', isAdmin, apiUsersGetUsers);

router.put('/premium/:uid', isAdmin, apiUsersChangeRole);

router.post('/:uid/documents', upload.array('documents'), apiUsersUploadDocuments);

router.delete('/', isAdmin, apiUsersDeleteInactiveUsers);

router.delete('/:uid', isAdmin, apiUsersDeleteUser);



export default router