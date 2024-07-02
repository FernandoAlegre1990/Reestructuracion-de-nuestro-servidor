// routes/viewsCartsRouter.js
import express from 'express'
import { isAuthenticated } from "../public/js/authMiddleware.js";
import { readViewsCartController } from "../controllers/views.controller.js";

const router = express.Router();

router.get('/:cid', isAuthenticated, readViewsCartController);

export default router;
