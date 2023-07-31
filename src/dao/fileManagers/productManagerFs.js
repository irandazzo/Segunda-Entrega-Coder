import fs from "fs";
export default class ProductManager {

    constructor(path) {
        this.path = path
    }
    getProducts = async () => {
        try {
            if (fs.existsSync(this.path)) {
                let data = await fs.promises.readFile(this.path, "utf-8")
                const productsObj = JSON.parse(data)
                return productsObj
            }
        } catch (error) { console.log(`No se pudo recuperar el producto ${error.message}`)}
    }
    async checkProductValues(thisProduct) {
        async function isString(value) {
            return typeof value === 'string';
        }
        async function isNumber(value) {
            return typeof value === 'number';
        }

        const data = await fs.promises.readFile(this.path, "utf-8");
        const productsObj = JSON.parse(data);

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
                console.log("Validación erronea")
                return false
            }
        } catch (error) {
            console.log(`Manager CheckValues failed, ${error.message}`)
        }
    }
    async addProduct(newProduct) {

        const productsObj = await this.getProducts();
        try {
            if (fs.existsSync(this.path)) {
                if (await this.checkProductValues(newProduct) === true) {
                    let codeCheckIfFound = productsObj.some(x => x.code === newProduct.code)
                    if (codeCheckIfFound == true) {
                        return { status: "error", message: `Producto ya agregado a DB`}
                    } else {
                        
                        newProduct.id = productsObj.length + 1
                        productsObj.push(newProduct)
                        await fs.promises.writeFile(this.path, JSON.stringify(productsObj), null, "\t")
                        return { status: `Ok`, message: `Producto Agregado correctamente.` }
                    }

                } else {
                    return { status: "error", message: `No se pudo agregar el producto`}
                }
            } else {
                return { status: "error", message: `No se pudo agregar el producto,  no existe en DB ${this.path}` }
            }
        } catch (error) {
            console.log(`No se pudo agregar el producto ${error.message}`)
            return { status: `error`, message: `No se pudo agregar el producto ${error.message}.` }
        }
    };
    async getProductById(thisId) {
        try {
            const data = await fs.promises.readFile(this.path, "utf-8")
            const productsObj = JSON.parse(data)
            let foundId = productsObj.find(x => x.id === thisId)
            if (foundId) {
                return foundId
            } else {
                console.log("Producto NO ENCONTRADO.")
            }
        } catch (error) { console.log(`GPI error is ${error.message}`) }
    }
    async updateProduct(thisProduct) {
        try {
            const productsObj = await this.getProducts()
            let foundProduct = productsObj.find(x => x.id === thisProduct.id)

            if (foundProduct) {
                if (await this.checkProductValues(thisProduct) === true) {
                    console.log(`UPDATE PRODUCT: Updating ${foundProduct.title + " " + foundProduct.description} with new values.`)
                    const foundIndex = productsObj.findIndex(x => x.id === thisProduct.id)
                    productsObj[foundIndex] = thisProduct
                    await fs.promises.writeFile(this.path, JSON.stringify(productsObj), null, "\t")
                    return { status: "Ok", message: "Producto Actualizado." }
                } else {
                    console.log("Error al actualizar el producto.")
                    return { status: "error", message: "Error al actualizar el producto." }
                }
            } else {
                return { status: "error", message: "Producto no se encuentra en DB" }
            }
        } catch (error) { console.log(`No se pudo actualizar el producto ${error.message}`) }
    };
    async deleteProduct(thisId) {
        try {
            const data = await fs.promises.readFile(this.path, "utf-8")
            const productsObj = JSON.parse(data)
            const foundIndex = productsObj.findIndex(x => x.id === thisId)

            if (foundIndex >= 0) {
                productsObj.splice(foundIndex, 1)
                await fs.promises.writeFile(this.path, JSON.stringify(productsObj), null, "\t")
            } else {
                console.log(`Producto no encontrado`);
            }
        } catch (error) { console.log(`DeleteProduct in manager failed, error is ${error.message}`) }
    }
};


