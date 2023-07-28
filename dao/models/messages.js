import mongoose from "mongoose";

const collectionName = 'messages'

const messageSchema = mongoose.Schema({
    user: String,
    message: String,
})

const messageModel = mongoose.model(collectionName, messageSchema);

export default messageModel;