import messageModel from './../models/messages.js';

export default class Messages {
    constructor() {
        console.log('Conectado a Mongo Atlas Db.')
    }
    saveMessage = async (message) => {
        try {
            await messageModel.create(message)
            return { status: 'Success.', message: 'Mensaje Agregado.' }
        } catch (error) { console.error('Error creando los mensajes desde DB', error.message)}
    }
    getAllMessages = async () => {
        try {
            const messages = await messageModel.find()
            return messages
        } catch (error) { console.error('Error levantando los mensajes desde DB', error.message)}
    }
};