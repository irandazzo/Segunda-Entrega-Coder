import { Router } from "express";
import ProductManager from "../dao/dbManagers/productsManager.js";

const router = Router();
const manager = new ProductManager();

/* Validaciones */
async function isString(value) {
    return typeof value === 'string';
}
async function isNumber(value) {
    return typeof value === 'number';
}
async function checkProductValues(thisProduct) {
    try {
        if (await isString(thisProduct.title) === true &&
            await isString(thisProduct.description) === true &&
            await isNumber(thisProduct.price) === true &&
            await isString(thisProduct.thumbnail) == true &&
            await isString(thisProduct.category) === true &&
            await isString(thisProduct.code) === true &&
            await isNumber(thisProduct.stock) === true) {
            return true
        } else {
            return false
        }
    } catch (error) {
        console.log(`Resultado fallido ${error.message}`);
    };
};

export default ProductManager;
