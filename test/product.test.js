import mongoose from 'mongoose';
import Product from '../src/dao/product.mongo.dao.js';
import Assert from 'assert';
import config from '../src/config/config.js';
import { faker } from '@faker-js/faker';

const mongoURLTest = config.mongoURLTest;

mongoose.connect(mongoURLTest, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const assert = Assert.strict;

describe('Testing Product DAO', function () {
    this.timeout(10000); // Aumentar el tiempo de espera para todas las pruebas en este bloque

    beforeEach(async function () {
        try {
            console.log("Eliminando la colección 'products'...");
            const start = Date.now(); // Guardar el tiempo de inicio
            await mongoose.connection.collections.products.drop();
            const end = Date.now(); // Guardar el tiempo de finalización
            console.log(`La colección 'products' se eliminó correctamente. Tiempo transcurrido: ${end - start}ms`);
        } catch (err) {
            if (err.message !== 'ns not found') {
                throw err;
            }
        }
    });
    

    it('El get debe devolver los productos en un arreglo', async function () {
        const result = await this.productDao.getAll();
        assert.strictEqual(Array.isArray(result), true);
    });

    it('El DAO debe poder crear productos', async function () {
        const result = await this.productDao.create({
            title: faker.commerce.productName(),
            description: faker.lorem.sentence(),
            code: faker.string.nanoid(10),
            status: true,
            price: parseFloat(faker.commerce.price()),
            stock: parseInt(faker.number.int({ min: 20, max: 100 })),
            category: faker.commerce.department(),
            thumbnail: [faker.image.url()],
        });
        assert.ok(result._id);
    });
});
