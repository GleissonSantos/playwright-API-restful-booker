import { test, expect } from "@playwright/test";

var tokenRecebido 

test('Deletando uma reserva cadastrada', async ({request}) => {

  // Criando uma nova reserva para depois deletar
  const register = await request.post('/booking/', {
    data: {
    "firstname": "Toshiro",
    "lastname": "San",
    "totalprice": 10000,
    "depositpaid": true,
    "bookingdates": {
        "checkin": "2025-11-10",
        "checkout": "2026-01-10"
    },
    "additionalneeds": "Breakfast"
  }
})
  console.log(await register.json());

  const idCriado = await register.json();
  const idNovoCadastro = idCriado.bookingid;
  console.log("O ID do novo cadastro foi: " + idNovoCadastro);

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

  // Deletando a reserva criada

  const deleteBooking = await request.delete('/booking/' + idNovoCadastro, {
    headers: {
      'Cookie': `token=${tokenRecebido}`
    }
  });

  expect(deleteBooking.ok()).toBeTruthy();
  expect(deleteBooking.status()).toBe(201);
  console.log("A Reserva " + idNovoCadastro + " deletada com sucesso!");

});