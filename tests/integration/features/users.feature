@apiproxy   
    Feature: JSON Placeholder fake API - GET

    Background: API de consumo para testes. Usada para criar testes automatizados.
    
Scenario: CT001.01 - Buscar usuário 1
    Given I set headers to
        | name            | value                  |
        | accept          | application/json       |
        | Content-Type    | application/json       |

    When I GET to /users/1
        Then response status code should be 200
        And response header content-type should be application/json
        And response body should be valid json
        And response body path $.name should be "Leanne Graham"

