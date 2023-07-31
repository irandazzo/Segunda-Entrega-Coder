import cartsModel from '../models/carts.js';
import ProductManager from './productsManager.js';
import mongoose from 'mongoose';

const productManager = new ProductManager();
export default class Carts {
    constructor() {
        console.log('Conectado a Mongo Atlas DB.');
    };
    createCart = async () => {
        try {
            let newCart = {
                "products": []
            }
            await cartsModel.create(newCart)
            return ({ status: 'Success.', message: 'Carrito Creado.' })
        } catch (error) { return { status: "error", message: error.message } }
    };

    getAll = async () => {
        let carts = await cartsModel.find().lean()
        return carts.length <= 0 ? ({ status: 'Error.', message: 'Colección de Carritos Vacía'}) : (carts)
    };
    getCartById = async (id) => {
        return await cartsModel.findOne({ _id: id })
    };
    deleteCart = async (id) => {
        try {
            await cartsModel.deleteOne({ _id: id });
            return { status: 'Success.', message: `Carrito ${id} eliminado.` };
        } catch (error) {
            return { status: 'error', message: error.message };
        }
    };
addProductToCart = async (cartId, productId) => {
        try {
            const thisCart = await cartsModel.findById(cartId);

            if (!thisCart) {
                return { status: "error", message: 'Carrito no existe, chequear ID.' };
            }

            const productIndex = thisCart.products.findIndex((p) => p.product.toString() === productId); //el toString es necesario

            if (productIndex !== -1) {
                thisCart.products[productIndex].quantity += 1;
            } else {
                thisCart.products.push({ product: productId, quantity: 1 });
            }

            await cartsModel.findByIdAndUpdate(thisCart._id, thisCart);

            return { status: 'success', message: 'Producto Agregado.', payload: thisCart };
        } catch (error) {
            console.error(error);
            return { status: "error", message: `Error:${error.message}`}
        };
    };
    deleteProductFromCart = async (cartId, productId) => {
        try {
            const thisCart = await cartsModel.findById(cartId);

            if (!thisCart) {
                return { status: 'error', message: 'Carrito no existe, chequear el ID.' };
            }

            const foundProduct = await productManager.findProductById(productId);
            if (!foundProduct) {
                return { status: 'error', message: 'El producto no existe, chequear ID.' };
            }

            const productIndex = thisCart.products.findIndex((p) => p.product.toString() === productId);

            if (productIndex !== -1) {
                thisCart.products.splice(productIndex, 1);
                await cartsModel.findByIdAndUpdate(thisCart._id, thisCart);
                return { status: 'success', message: 'Producto eliminado.', payload: thisCart };
            } else {
                return { status: 'error', message: 'Producto no encontrado en el Carrito.' };
            }
        } catch (error) {
            return { status: 'error', message: `Error:${error.message}`};
        }
    };
};
