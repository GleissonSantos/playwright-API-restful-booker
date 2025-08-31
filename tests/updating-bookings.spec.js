import { test, expect } from "@playwright/test";

var tokenRecebido 

test('Atualizando parcialmente os dados de uma reserva', async ({request}) => {

  // criando o token 
  const response = await request.post('/auth', {
    data: {
      "username": "admin",
      "password": "password123"
    }
  });

  console.log(await response.json());

   // Verificando se a resposta da API está OK

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  const responseBody = await response.json();

  tokenRecebido = responseBody.token;

  console.log("Seu token é:" + tokenRecebido);

  // Criando uma nova reserva para depois atualizar
  const registerBooking = await request.post('/booking/', {
    data: {
    "firstname": "Toshio",
    "lastname": "Santos",
    "totalprice": 10000,
    "depositpaid": true,
    "bookingdates": {
        "checkin": "2025-11-10",
        "checkout": "2026-01-10"
    },
    "additionalneeds": "Breakfast"
  }
})
  console.log("Abaixo estão os dados cadastrados da nova reserva:");
  console.log(await registerBooking.json());

  // Verificiando se a resposta da API está OK
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  const responseBodyRegister = await registerBooking.json();

  const newResponseBodyRegister = responseBodyRegister.bookingid;


  // Atualizando dados da reserva:
  const partialUpdateRequest = await request.patch('/booking/'+ newResponseBodyRegister, {

    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Cookie': `token=${tokenRecebido}`
    },

    data: {

        "firstname": "Yukio",
        "lastname": "Lains",
        "totalprice": 5000,
        "depositpaid": false

    }

});

console.log("Abaixo estão os dados que foram atualizados da reserva:");
console.log(await partialUpdateRequest.json());

expect(partialUpdateRequest.ok()).toBeTruthy();
expect(partialUpdateRequest.status()).toBe(200);

// Verificando os dados atualizados
const partialUpdatedResponseBody = await partialUpdateRequest.json()

expect(partialUpdatedResponseBody).toHaveProperty("firstname", "Yukio");
expect(partialUpdatedResponseBody).toHaveProperty("lastname", "Lains");
expect(partialUpdatedResponseBody).toHaveProperty("totalprice", 5000);
expect(partialUpdatedResponseBody).toHaveProperty("depositpaid", false);

});