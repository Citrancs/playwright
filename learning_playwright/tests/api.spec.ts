import { test, expect } from "@playwright/test";

test("GET /products", async ({ request }) => {
  const apiUrl = "https://api.practicesoftwaretesting.com";
  const response = await request.get(apiUrl + "/products");

  expect(response.status()).toBe(200);
  const body = await response.json();
  //console.log(body);
  expect(body.data.length).toBe(9);
  expect(body.total).toBe(50);
});

test("POST /users/login", async ({ request }) => {
  const apiUrl = "https://api.practicesoftwaretesting.com";
  const response = await request.post(apiUrl + "/users/login", {
    data: {
      email: "customer@practicesoftwaretesting.com",
      password: "welcome01"
    },
  });

  expect(response.status()).toBe(200);
  const body = await response.json();
  //console.log(body);
  expect(body.access_token).toBeTruthy();
});

test("GET /products/{id}", async ({ request }) => {
  const apiUrl = "https://api.practicesoftwaretesting.com";
  const response = await request.get(apiUrl + "/products/01M00CKNNMP9TJC5HJXYMA06DF");
  expect(response.status()).toBe(200);
  const body = await response.json();
  console.log(body);
});

test("GET /products/{id} - dinamikus ID használatával", async ({ request }) => {
  const baseUrl = "https://api.practicesoftwaretesting.com";

  // 1. LÉPÉS: Lekérjük a termékek listáját
  const listResponse = await request.get(`${baseUrl}/products`);
  expect(listResponse).toBeOK();

  const listBody = await listResponse.json();

  // Kiválasztjuk az első termék ID-ját a listából (a válasz struktúrájától függően pl. listBody.data[0].id)
  const dynamicProductId = listBody.data[0].id;

  // 2. LÉPÉS: A dinamikusan megszerzett ID-val kérjük le a konkrét terméket
  const productResponse = await request.get(
    `${baseUrl}/products/${dynamicProductId}`,
  );
  expect(productResponse).toBeOK();

  const productBody = await productResponse.json();

  // 3. LÉPÉS: Ellenőrizzük, hogy valóban azt a terméket kaptuk-e vissza, amit kértünk
  expect(productBody.id).toBe(dynamicProductId);
  expect(productBody).toHaveProperty("name");
});