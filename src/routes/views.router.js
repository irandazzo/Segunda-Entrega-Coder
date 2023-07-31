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
/* Login/Register/Reset Password */
router.get('/register', (req, res) => {
    res.render('register');
})

router.get('/login', (req, res) => {
    res.render('login');
})

router.get('/profile', (req, res) => {
    res.render('profile',{
        user: req.session.user,
    });
});

router.get('/resetPassword',(req,res)=>{
    res.render('resetPassword');
})
/* Chat en Vivo */
router.get('/chat', (req, res) => {
    res.render('chat', {
        style: 'index.css'
    });
});

export default router;
