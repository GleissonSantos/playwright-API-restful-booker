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

  const response = await request.get('/booking/1066')

  //transforma a resposta em json
  const responseBody = await response.json();
  console.log(responseBody);

  // Verificando se os dados da reserva estão corretos
  expect(responseBody.firstname).toBe('John');
  expect(responseBody.lastname).toBe('Smith');
  expect(responseBody.totalprice).toBe(111);
  expect(responseBody.depositpaid).toBe(true);
  expect(responseBody.bookingdates.checkin).toBe('2018-01-01');
  expect(responseBody.bookingdates.checkout).toBe('2019-01-01');
  expect(responseBody.additionalneeds).toBe('Breakfast');

  // Verificiando se a resposta da API está OK
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
});

test('Consultando se os campos de uma reserva específica estão sendo retornados', async ({request}) => {

  const response = await request.get('/booking/1066')
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



