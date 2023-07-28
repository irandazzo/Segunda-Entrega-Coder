import productsModel from '../models/products.js';

export default class Products {
    constructor() {
        console.log('Conectado a Mongo Atlas DB.')
    }
    getAll = async () => {
        let products = await productsModel.find().lean()
        return products
    }
    saveProduct = async (product) => {
        await productsModel.create(product)
        return ({ status: 'Success.', message: 'Product added.' })
    }
    findProductById = async (id) => {
        let foundProduct = await productsModel.findOne({ _id: id })
        return foundProduct
    }
    updateProduct = async (id, newData) => {
        let foundProduct = await productsModel.findOne({ _id: id })
        let updatedProperties = {}
        if (newData.title) {
            await foundProduct.updateOne({ $set: { title: newData.title } })
            updatedProperties.title = newData.title
        }
        if (newData.description) {
            await foundProduct.updateOne({ $set: { description: newData.description } })
            updatedProperties.description = newData.description
        };
        if (newData.price) {
            await foundProduct.updateOne({ $set: { price: newData.price } })
            updatedProperties.price = newData.price
        };
        if (newData.thumbnail) {
            await foundProduct.updateOne({ $set: { thumbnail: newData.thumbnail } })
            updatedProperties.thumbnail = newData.thumbnail
        };
        if (newData.code) {
            await foundProduct.updateOne({ $set: { code: newData.code } })
            updatedProperties.code = newData.code
        };
        if (newData.stock) {
            await foundProduct.updateOne({ $set: { stock: newData.stock } })
            updatedProperties.stock = newData.stock

        };
        return { status: 'Success.', message: 'Producto modificado.', payload: updatedProperties }
    }
    deleteProduct = async (id) => {
        try {
            await productsModel.deleteOne({ _id: id });
            return { status: 'Success.', message: `Producto ${id} eliminado.` };
        } catch (error) {
            return { status: 'error', message: error.message };
        }
    };
};