import { test, expect } from "@playwright/test";
import { cadastrarReserva, gerarToken } from "./apiHelpers.js"; 

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

   // Criando uma nova reserva para depois consultar - chamando a função de criação de criação de cadastro do helper 
  const newBookingRegister = await cadastrarReserva(request);

  console.log("Abaixo estão os dados cadastrados da nova reserva:");
  console.log(await newBookingRegister.json());

  // Verificiando se a resposta da API está OK
  expect(newBookingRegister.ok()).toBeTruthy();
  expect(newBookingRegister.status()).toBe(200);

  const responseBodyRegister = await newBookingRegister.json();
  const newResponseBodyRegister = responseBodyRegister.bookingid;
  

  // Fazendo uma requisilção GET para a API para obter os detalhes da reserva com base em um ID específico criado
  const response = await request.get('/booking/'+ newResponseBodyRegister)

  //transforma a resposta em json
  const responseBody = await response.json();
  //console.log(responseBody);

  // Verificando se os dados da reserva estão corretos
  expect(responseBody.firstname).toBe(responseBody.firstname);
  expect(responseBody.lastname).toBe(responseBody.lastname);
  expect(responseBody.totalprice).toBe(responseBody.totalprice);
  expect(responseBody.depositpaid).toBe(true);
  expect(responseBody.bookingdates.checkin).toBe(responseBody.bookingdates.checkin);
  expect(responseBody.bookingdates.checkout).toBe(responseBody.bookingdates.checkout);
  expect(responseBody.additionalneeds).toBe(responseBody.additionalneeds);

  // Verificiando se a resposta da API está OK
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
});

test('Consultando se os campos de uma reserva específica estão sendo retornados', async ({request}) => {

   // Criando uma nova reserva para depois consultar - chamando a função de criação de criação de cadastro do helper 
  const newBookingRegister = await cadastrarReserva(request);

  console.log("Abaixo estão os dados cadastrados da nova reserva:");
  console.log(await newBookingRegister.json());

  // Verificiando se a resposta da API está OK
  expect(newBookingRegister.ok()).toBeTruthy();
  expect(newBookingRegister.status()).toBe(200);

  const responseBodyRegister = await newBookingRegister.json();
  const newResponseBodyRegister = responseBodyRegister.bookingid;

   // Fazendo uma requisilção GET para a API para obter os detalhes da reserva com base em um ID específico criado
  const response = await request.get('/booking/' + newResponseBodyRegister)
  const responseBody = await response.json();

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



