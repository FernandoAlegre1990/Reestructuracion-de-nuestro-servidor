import ProductModel from '../models/product.model.js';
import cartModel from "../models/cart.model.js";
import { ProductService } from '../services/index.js';
import config from '../config/config.js'
import logger from '../logger.js'


export const readViewsProductsController = async (req, res) => {
  try {
    let pageNum = parseInt(req.query.page) || 1;
    let itemsPorPage = parseInt(req.query.limit) || 10;
    const products = await ProductModel.paginate({}, { page: pageNum, limit: itemsPorPage, lean: true });

    products.prevLink = products.hasPrevPage ? `/products?limit=${itemsPorPage}&page=${products.prevPage}` : '';
    products.nextLink = products.hasNextPage ? `/products?limit=${itemsPorPage}&page=${products.nextPage}` : '';

    const userInfo = {
      first_name: req.session.user.first_name,
      last_name: req.session.user.last_name,
      email: req.session.user.email,
      age: req.session.user.age,
      role: req.session.user.role,
      cart: req.session.user.cart
    };

    let userCart = null;
    if (userInfo.cart) {
      userCart = await cartModel.findById(userInfo.cart).lean().exec();
    }

    console.log('User Info:', userInfo);
    console.log('User Cart:', userCart ? userCart._id : null);

    res.render('home', { 
      products: products.docs,
      prevLink: products.prevLink,
      nextLink: products.nextLink,
      userInfo, 
      cart: userCart ? userCart._id : 'dummyCartId'  // Adding dummyCartId for testing
    });
  } catch (error) {
    logger.error('Error al leer los productos:', error);
    res.status(500).json({ error: 'Error al leer los productos' });
  }
};
export const readViewsRealTimeProductsController = async (req, res) => {
  try {
    //const products = await ProductModel.find().lean().exec();
    const products = await ProductService.getAll()
    const userInfo = {
      email: req.session.user.email,
      role: req.session.user.role,
    };
    res.render('realTimeProducts', { products, userInfo });
  } catch (error) {
    logger.error('Error al leer los productos en tiempo real:', error);
    res.status(500).json({ error: 'Error al leer los productos en tiempo real' });
  }
}

export const readViewsProductController = async (req, res) => {
  try {
    const id = req.params.pid; // Obtener el ID del parámetro de la URL
    const result = await ProductService.getById(id); // Obtener el producto por su ID usando el servicio ProductService

    if (!result) {
      // Si no se encuentra el producto, devolver un error 404
      return res.status(404).json({ status: 'error', error: 'Product not found' });
    }

    // Obtener información del carrito desde la sesión del usuario
    const cartInfo = {
      cart: req.session.user.cart,
    };

    // Determinar si el usuario es administrador o no (para control de acceso)
    const userAdminControl = req.session.user.email !== config.adminEmail;

    // Renderizar la vista 'productDetail' y pasar los datos del producto y la información del carrito
    res.render('productDetail', {
      product: result, // Pasar el producto encontrado
      cartID: cartInfo.cart, // Pasar el ID del carrito desde la sesión del usuario
      userAdminControl: userAdminControl // Pasar la bandera de control de administrador
    });
  } catch (error) {
    // Manejar cualquier error y devolver un error 500 en caso de falla
    console.error('Error al leer el producto:', error);
    res.status(500).json({ error: 'Error al leer los productos' });
  }
};

export const readViewsCartController = async (req, res) => {
  try {
      const id = req.params.cid;
      const cart = await cartModel.findById(id).populate('products.product').exec();
      
      if (!cart) {
          return res.status(404).json({ status: 'error', error: 'Cart not found' });
      }
      
      // Mapear los productos para obtener los datos necesarios
      const products = cart.products.map(item => ({
          title: item.product.title,
          thumbnail: item.product.thumbnail,
          price: item.product.price,
          quantity: item.quantity
      }));

      // Renderizar la vista 'carts' y pasar los datos al template
      res.render('carts', { 
          cid: cart._id, 
          products: products,
          mailUser: req.session.user.email
      });
      
  } catch (error) {
      res.status(500).json({ status: 'error', error: error.message });
  }
};