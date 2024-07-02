import { Router } from "express"
import ProductManager from '../dao/fsManagers/ProductManager.js'
import ProductModel from '../models/product.model.js';
import cartModel from "../models/cart.model.js";
import { isAuthenticated, isAdminOrPremium, hasAdminCredentials } from "../public/js/authMiddleware.js";
import { 
  readViewsProductsController, 
  readViewsRealTimeProductsController, 
  readViewsProductController,
  readViewsCartController,

} from "../controllers/views.controller.js";

const router = Router();

router.get('/', isAuthenticated, readViewsProductsController); // Devuelve todos los productos
  
router.get('/realtimeproducts', isAuthenticated, isAdminOrPremium, readViewsRealTimeProductsController); // Devuelve todos los productos en tiempo real

router.get('/:pid', isAuthenticated, readViewsProductController) // Devuelve un producto según su id

router.get('/carts/:cid', isAuthenticated, readViewsCartController);

 
export default router;