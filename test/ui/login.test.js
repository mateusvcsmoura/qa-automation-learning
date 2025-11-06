const { Builder, By, until } = require('selenium-webdriver');
const { expect } = require('chai');

describe('Teste de Usabilidade - Fluxo de Login e Navegação (Sauce Demo)', function () {
    this.timeout(40000);
    let driver;

    before(async () => {
        driver = await new Builder().forBrowser('chrome').build();
    });

    after(async () => {
        await driver.quit();
    });

    it('Deve fazer login no site de demonstração e visualizar produtos', async () => {
        await driver.get('https://www.saucedemo.com/');

        await driver.wait(until.elementLocated(By.id('user-name')), 10000);
        await driver.findElement(By.id('user-name')).sendKeys('standard_user');
        await driver.findElement(By.id('password')).sendKeys('secret_sauce');
        await driver.findElement(By.id('login-button')).click();

        // Aguarda a página principal
        await driver.wait(until.urlContains('inventory'), 10000);

        // Verifica se há produtos listados
        const produtos = await driver.findElements(By.css('.inventory_item'));
        expect(produtos.length).to.be.greaterThan(0);

        console.log(`Login e navegação concluídos! ${produtos.length} produtos encontrados.`);
    });
});

