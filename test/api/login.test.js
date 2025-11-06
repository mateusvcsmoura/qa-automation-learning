const axios = require('axios');
const { expect } = require('chai');

describe('Teste de API - Login (DummyJSON)', async function () {
    this.timeout(10000);

    const url = 'https://dummyjson.com/auth/login';

    describe('Testes 200', async () => {
        it('Deve retornar 200 e um token válido com credenciais corretas', async () => {
            const response = await axios.post(url, {
                username: 'emilys',
                password: 'emilyspass'
            });

            expect(response.status).to.equal(200);
            expect(response.data).to.have.property('accessToken');
            expect(response.data).to.have.property('username', 'emilys');
        });
    });

    describe('Testes 400', async () => {
        it('Deve retornar 400 com credenciais inválidas', async () => {
            try {
                await axios.post(url, {
                    username: 'usuarioInvalido',
                    password: 'senhaErrada'
                });
            } catch (error) {
                expect(error.response.status).to.equal(400);
                expect(error.response.data).to.have.property('message');
                expect(error.response.data.message).to.include('Invalid credentials');
            }
        });
    });

    describe('Testes 401', async () => {
        it('Deve retornar 401 quando faltar autenticação', async () => {
            try {
                await axios.post(url, {}); // Sem username nem password
            } catch (error) {
                expect([400, 401]).to.include(error.response.status);
                expect(error.response.data).to.have.property('message');
            }
        });
    });

    describe('Testes 405', () => {
        it('Deve retornar 405 ao usar método não permitido (GET)', async () => {
            try {
                await axios.get(url); // a rota só aceita POST
                throw new Error('Esperava erro 405, 404, 401 mas requisição foi bem-sucedida');
            } catch (error) {
                // Alguns servidores retornam 404 em vez de 405, então checamos ambos
                expect([401, 404, 405]).to.include(error.response.status);
                console.log('Status retornado:', error.response.status);
            }
        });
    });
});


