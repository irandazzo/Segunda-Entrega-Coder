import { Router } from "express";
import Carts from '../dao/dbManagers/cartsManager.js';
import Products from '../dao/dbManagers/productsManager.js';

const productManager = new Products();
const cartManager = new Carts();

const router = Router();


/* Productos */
router.get('/', async (req, res) => {
    let products = await productManager.getAll();
    res.render('products', { products });
});

/* Carrito */
router.get('/carts', async (req, res) => {
    let carts = await cartManager.getAll();
    res.render('carts', { carts });
});
/* Chat en Vivo */
router.get('/chat', (req, res) => {
    res.render('chat', {
        style: 'index.css'
    });
});

export default router;
