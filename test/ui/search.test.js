const { Builder, By, until } = require("selenium-webdriver");
const { expect } = require("chai");

describe("DuckDuckGo Search Test", function () {
    this.timeout(20000); // tempo máximo pro teste

    let driver;

    before(async function () {
        driver = await new Builder().forBrowser("chrome").build();
    });

    after(async function () {
        await driver.quit();
    });

    it("Deve buscar por 'Selenium WebDriver' e exibir resultados", async function () {
        // 1. Acessar DuckDuckGo
        await driver.get("https://duckduckgo.com/");

        // 2. Digitar na barra de busca
        const searchBox = await driver.findElement(By.id("searchbox_input"));
        await searchBox.sendKeys("Selenium WebDriver");
        await searchBox.submit();

        // 3. Esperar os resultados aparecerem
        await driver.wait(until.elementLocated(By.css(".react-results--main")), 10000);

        // 4. Validar se apareceu algo
        const title = await driver.getTitle(); // Título da página
        expect(title).to.include("Selenium WebDriver");
    });
});
