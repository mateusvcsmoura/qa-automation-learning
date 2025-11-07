const axios = require('axios');
const { expect } = require("chai");

describe("Teste de API - PokéAPI", function () {
    this.timeout(10000);

    it("Deve retornar informações do Pokémon Pikachu", async () => {
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon/pikachu");

        expect(response.status).to.equal(200);
        expect(response.data.name).to.equal("pikachu");
        expect(response.data).to.have.property("abilities");
        expect(response.data.abilities).to.be.an("array").that.is.not.empty;

        console.log(response.data.name);
        console.log(response.data.abilities);
    });
});

