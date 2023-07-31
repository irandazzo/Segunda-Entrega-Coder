import { Router } from "express";
import CartManager from "../dao/dbManagers/cartsManager.js";

const router = Router();
const manager = new CartManager("./data/carts.json");

router.get("/", async (req, res) => {
    const carts = await manager.getAll()
    if (carts.length <= 0) {
        res.send({ status: 'Error', message: 'Carrito Vacío' })
    } else {
        res.send(carts)
    };
});
router.post("/", async (req, res) => {
    try {
        const carts = await manager.getAll()
        if (carts.length <= 0) {
            await manager.createCart()
            res.send({ status: "Ok", message: "Nuevo Carrito Agregado" })
        } else {
            await manager.createCart()
            res.send({ status: "Ok", message: "Nuevo Carrito Agregado" })
        }
    } catch (error) { return { status: "error", message: error.message } }
});

router.get("/:cid", async (req, res) => {
    const cid = req.params.cid
    const foundCart = await manager.getCartById(cid)
    if (foundCart) {
        res.send(foundCart)
    } else {
        res.send({ error: `Id del Carrito no encontrado.` })
    }
});

router.post("/:cid/products/:pid", async (req, res) => {
    const cid = req.params.cid
    const pid = req.params.pid
    const result = await manager.addProductToCart(cid, pid)
    res.send(result)
});

router.delete("/:cid", async (req, res) => {
    const cid = req.params.cid
    const result = await manager.deleteCart(cid)
    res.send(result)
});

router.put('/:cid/products/:pid', async (req, res) => {
    const cid = req.params.cid
    const pid = req.params.pid
    const result = await manager.deleteProductFromCart(cid, pid)
    res.send(result)
});

export default router;