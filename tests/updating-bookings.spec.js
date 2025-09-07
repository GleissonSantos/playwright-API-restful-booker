import { test, expect } from "@playwright/test";
import { cadastrarReserva, gerarToken } from "./apiHelpers.js";

var newTokenRecebido 

test('Atualizando parcialmente os dados de uma reserva', async ({request}) => {

  // Criando uma nova reserva para depois atualizar - chamando a função do helper de cadastro
  const newBookingRegister = await cadastrarReserva(request);
  const idNewRegister = (await newBookingRegister.json()).bookingid;

  // Criando o token - chamando a função do helper de token
  const createNewToken = await gerarToken(request);
  console.log(await createNewToken.json());

  // Pegando o token do response 
  const responseBody = await createNewToken.json();
  newTokenRecebido = responseBody.token;
  
  // TESTE COMEÇA 
  // Atualizando dados da reserva:
  const partialUpdateRequest = await request.patch('/booking/'+ idNewRegister, {

    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Cookie': `token=${newTokenRecebido}`
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