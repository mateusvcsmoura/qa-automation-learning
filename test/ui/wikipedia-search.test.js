const { Builder, By, until } = require("selenium-webdriver");
const { expect } = require("chai");

describe("Busca no Wikipedia", function () {
    this.timeout(30000);
    let driver;

    before(async () => {
        driver = await new Builder().forBrowser("chrome").build();
    });

    after(async () => {
        await driver.quit();
    });

    it("Deve buscar 'JavaScript', clicar no resultado e validar o título", async () => {
        await driver.get("https://www.wikipedia.org/");

        const searchInput = await driver.findElement(By.id("searchInput"));
        await searchInput.sendKeys("JavaScript");

        const searchButton = await driver.findElement(By.css("button[type='submit']"));
        await searchButton.click();

        // Espera o resultado aparecer e clica no primeiro link
        await driver.wait(until.elementLocated(By.id("firstHeading")), 10000);

        const heading = await driver.findElement(By.id("firstHeading")).getText(); // heading da matéria
        const title = await driver.getTitle(); // título da página

        expect(heading).to.equal("JavaScript");
        expect(title).to.include("JavaScript");
    });
});
