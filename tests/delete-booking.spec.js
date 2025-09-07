import { test, expect } from "@playwright/test";
import { cadastrarReserva, gerarToken } from "./apiHelpers.js";

var tokenRecebido 

test('Deletando uma reserva cadastrada', async ({request}) => {

  // Criando uma nova reserva para depois atualizar - chamando a função do helper de cadastro
  const newBookingRegister = await cadastrarReserva(request);
  const idNewRegister = (await newBookingRegister.json()).bookingid;

   // Criando o token - chamando a função do helper de token
   const tonkenResponse = await gerarToken(request);
   console.log(await tonkenResponse.json());
 
   // Pegando o token do response 
   const responseBody = await tonkenResponse.json();
   tokenRecebido = responseBody.token;

  // O TESTE COMEÇA AQUI
  // Deletando a reserva criada
  const deleteBooking = await request.delete('/booking/' + idNewRegister, {
    headers: {
      'Cookie': `token=${tokenRecebido}`
    }
  });

  expect(deleteBooking.ok()).toBeTruthy();
  expect(deleteBooking.status()).toBe(201);
  console.log("A Reserva " + idNewRegister + " deletada com sucesso!");

});