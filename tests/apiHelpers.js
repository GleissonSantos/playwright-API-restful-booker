import { test, expect } from "@playwright/test";
import { faker } from '@faker-js/faker';


export async function cadastrarReserva(request) {

  const response = await request.post('/booking/', {
    data: {
      "firstname": faker.person.firstName(),
      "lastname": faker.person.lastName(),
      "totalprice": faker.number.int({ min: 100, max: 5000 }),
      "depositpaid": true,
      "bookingdates": {
        "checkin": faker.date.soon({ refDate: Date.now() }).toISOString().split('T')[0],
        "checkout": faker.date.soon({ refDate: Date.now() + 5 * 24 * 60 * 60 * 1000 }).toISOString().split('T')[0]
      },
      "additionalneeds": faker.lorem.word({ length: { min: 5, max: 10 } })
    }
  })
  //console.log(await response.json());

  // Verificiando se a resposta da API está OK
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  // Validando os dados de retorno
  const responseBody = await response.json()
  expect(responseBody.booking).toHaveProperty("firstname", responseBody.booking.firstname);
  expect(responseBody.booking).toHaveProperty("lastname", responseBody.booking.lastname);
  expect(responseBody.booking).toHaveProperty("totalprice", responseBody.booking.totalprice);
  expect(responseBody.booking).toHaveProperty("depositpaid", true);

  return response;

};

export async function gerarToken(request) {

  const response = await request.post('/auth', {
    data: {
      "username": "admin",
      "password": "password123"
    }
  })

  // Verificando se a resposta da API está OK
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
  //console.log("Seu token é:" + tokenRecebido);
  return response;
};