require("dotenv").config({ path: ".env" });

const request = require("supertest");
const app = require("../app");
const db = require("../models/db");

describe("Books API", () => {
  beforeAll(async () => {
    await db.query(
      `INSERT IGNORE INTO publishers (id, name) VALUES (100, 'Test Publisher')`
    );
    await db.query(
      `INSERT IGNORE INTO authors (id, first_name, last_name, year_of_birth) VALUES (100, 'Author', 'One', 1980)`
    );
  });

  afterAll(async () => {
    await db.query(`DELETE FROM books WHERE isbn IN (7777, 8888, 9999)`);
    await db.end?.();
  });

  test("should fetch all books", async () => {
    await db.query(`
      INSERT IGNORE INTO books (isbn, name, genre, year_of_publication, publisher_id, author_id, description, amount)
      VALUES (8888, 'Test Book', 'Fiction', 2022, 100, 100, 'A test book', 5)
    `);

    const response = await request(app).get("/api/books/all");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.some((b) => b.isbn === 8888)).toBe(true);
  });

  test("should add a new book", async () => {
    const response = await request(app).post("/api/books/add").send({
      isbn: 7777,
      name: "Integration Test Book",
      genre: "Science",
      year_of_publication: 2023,
      publisher_id: 100,
      author_id: 100,
      image: "",
      amount: 10,
      description: "A test book added via integration test.",
    });

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toMatch(/added successfully/i);
  });

  test("should return a specific book by ISBN", async () => {
    await db.query(`
      INSERT IGNORE INTO books (isbn, name, genre, year_of_publication, publisher_id, author_id, description, amount)
      VALUES (9999, 'Find Me Book', 'Drama', 2020, 100, 100, 'Drama test book', 3)
    `);

    const response = await request(app).get("/api/books/9999");

    expect(response.statusCode).toBe(200);
    expect(response.body[0].name).toBe("Find Me Book");
  });

  test("should return 404 for non-existent book", async () => {
    const response = await request(app).get("/api/books/123456");
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("error");
  });

  test("should delete a book", async () => {
    await db.query(`
      INSERT INTO books (isbn, name, genre, year_of_publication, publisher_id, author_id, description, amount)
      VALUES (9998, 'To Be Deleted', 'Test', 2021, 100, 100, 'Temporary book', 1)
    `);

    const response = await request(app).delete("/api/books/delete/9998");
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toMatch(/deleted successfully/i);
  });

  test("should check availability of a book by title", async () => {
    await db.query(`
      INSERT INTO books (isbn, name, genre, year_of_publication, publisher_id, author_id, description, amount)
      VALUES (8889, 'Availability Book', 'Reference', 2021, 100, 100, 'Checking availability.', 2)
    `);

    const response = await request(app).get(
      "/api/books/is-available/Availability Book"
    );
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("amount");

    await db.query(`DELETE FROM books WHERE isbn = 8889`);
  });
});
