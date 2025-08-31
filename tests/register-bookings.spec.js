import { test, expect } from "@playwright/test";

var tokenRecebido 


test('Cadastrando uma reserva', async ({request}) => {

  const response = await request.post('/booking/', {
    data: {
    "firstname": "Toshio",
    "lastname": "Lins",
    "totalprice": 122,
    "depositpaid": true,
    "bookingdates": {
        "checkin": "2025-11-10",
        "checkout": "2026-01-10"
    },
    "additionalneeds": "Breakfast"
  }
})
  console.log(await response.json());

  // Verificiando se a resposta da API está OK
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  // Validando os dados de retorno
const responseBody = await response.json()
  expect(responseBody.booking).toHaveProperty("firstname", "Toshio");
  expect(responseBody.booking).toHaveProperty("lastname", "Lins");
  expect(responseBody.booking).toHaveProperty("totalprice", 122);
  expect(responseBody.booking).toHaveProperty("depositpaid", true);

});

test('Gerando um token', async ({request}) => {

  const response = await request.post('/auth', {
    data: {
      "username": "admin",
      "password": "password123"
    }
  })

  console.log(await response.json());

  // Verificiando se a resposta da API está OK
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  const responseBody = await response.json()
  tokenRecebido = responseBody.token;
  console.log("Seu token é:" + tokenRecebido);


});

