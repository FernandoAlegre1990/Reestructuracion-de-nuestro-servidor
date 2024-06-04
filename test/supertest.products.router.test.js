import { expect } from 'chai'; // Importación con destructuring
import supertest from 'supertest';
import ProductService from '../src/dao/product.mongo.dao.js';

const requester = supertest('http://localhost:8080');

describe('Testing de E-commerce de Backend', () => {
    it('Debe devolver status 200 si existen productos para mostrar', async () => {
        const response = await requester.get('/api/products');
        expect(response.status).to.equal(200);
        const responseBody = response.text;
        expect(typeof responseBody).to.equal('string');
    });
});
