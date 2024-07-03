import { Router } from 'express';
import { createSession, success, cancel } from '../controllers/payments.controller.js';

const router = Router();

router.post('/create-checkout-session', createSession); 
router.get('/success', success); // Si se realiza la compra
router.get('/cancel', cancel); // Si se cancela la compra

export default router;
