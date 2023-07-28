import express from "express";
import __dirname from "./utils.js";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import { Server } from 'socket.io';

/* Rutas */
import viewsRouter from './routes/views.router.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/cart.router.js';
import MessageManager from "./dao/dbManagers/messagesManager.js";

/* Servidor */
const PORT = 8080;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const httpserver = app.listen(PORT, () => console.log(`Servidor Arriba en Puerto: ${PORT}`));

/* Conexión con DB Mongo */
mongoose.set('strictQuery', false)
const connection = mongoose.connect('mongodb+srv://irandazzo:Huracan7314@cluster0.0xjxasx.mongodb.net/ecommerce?retryWrites=true&w=majority');

/* Handlebars */
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

/* Router */
app.use('/', viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);


/* Chat en tiempo real */
const messageManager = new MessageManager();

app.use(express.static(__dirname + '/public'));
const io = new Server(httpserver);

io.on('connection', socket => {
    console.log("Nuevo Cliente Conectado");
    socket.on('message', async data => {
        try {
            await messageManager.saveMessage(data)
            const allMessages = await messageManager.getAllMessages()
            io.emit('messageLogs', allMessages)
        } catch (error) { return { status: 'error', message: `Error al recuperar los mensajes. ${error.message}` } }
    });
});