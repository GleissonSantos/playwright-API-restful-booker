import { test, expect } from "@playwright/test";

var tokenRecebido 

test('Consultando as reservas cadastradas', async ({request}) => {

  // Fazendo uma requisilção GET para a API para obter os detalhes da reserva 
  const response = await request.get('/booking/')
  // Imprimindo os detalhes da reserva no console
  console.log(await response.json())
  // Verificando se a resposta da API foi bem-sucedida (status 200)
  expect(response.ok()).toBeTruthy();
  // Verificando se o status da resposta é 200 (OK)
  expect(response.status()).toBe(200)
});


test('Consultando as reservas cadastradas com base em um ID específico', async ({request}) => {

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
  expect(registerBooking.ok()).toBeTruthy();
  expect(registerBooking.status()).toBe(200);

  const responseBodyRegister = await registerBooking.json();
  const newResponseBodyRegister = responseBodyRegister.bookingid;
  

  // Fazendo uma requisilção GET para a API para obter os detalhes da reserva com base em um ID específico criado
  const response = await request.get('/booking/'+ newResponseBodyRegister)

  //transforma a resposta em json
  const responseBody = await response.json();
  console.log(responseBody);

  // Verificando se os dados da reserva estão corretos
  expect(responseBody.firstname).toBe('Toshio');
  expect(responseBody.lastname).toBe('Santos');
  expect(responseBody.totalprice).toBe(10000);
  expect(responseBody.depositpaid).toBe(true);
  expect(responseBody.bookingdates.checkin).toBe('2025-11-10');
  expect(responseBody.bookingdates.checkout).toBe('2026-01-10');
  expect(responseBody.additionalneeds).toBe('Breakfast');

  // Verificiando se a resposta da API está OK
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
});

test('Consultando se os campos de uma reserva específica estão sendo retornados', async ({request}) => {

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
  expect(registerBooking.ok()).toBeTruthy();
  expect(registerBooking.status()).toBe(200);

  const responseBodyRegister = await registerBooking.json();
  const newResponseBodyRegister = responseBodyRegister.bookingid;

   // Fazendo uma requisilção GET para a API para obter os detalhes da reserva com base em um ID específico criado
  const response = await request.get('/booking/' + newResponseBodyRegister)
  const responseBody = await response.json();
  console.log(responseBody);

  // Verificando se os campos estão presentes na resposta da API
  expect(responseBody).toHaveProperty('firstname');
  expect(responseBody).toHaveProperty('lastname');
  expect(responseBody).toHaveProperty('totalprice');
  expect(responseBody).toHaveProperty('depositpaid');
  expect(responseBody).toHaveProperty('bookingdates');
  expect(responseBody).toHaveProperty('additionalneeds');

  // Verificiando se a resposta da API está OK
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
});



