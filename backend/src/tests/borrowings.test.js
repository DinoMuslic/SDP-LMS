require("dotenv").config({ path: ".env" });

const request = require("supertest");
const app = require("../app");
const db = require("../models/db");

describe("Borrowings API", () => {
  beforeAll(async () => {
    await db.query(
      `INSERT IGNORE INTO publishers (id, name) VALUES (100, 'Test Publisher')`
    );
    await db.query(
      `INSERT IGNORE INTO authors (id, first_name, last_name, year_of_birth) VALUES (100, 'Author', 'One', 1980)`
    );

    await db.query(`
      INSERT IGNORE INTO users (id, first_name, last_name, email, password, role)
      VALUES (100, 'Test', 'User', 'test@example.com', '123456', 'student')
    `);

    await db.query(`
      INSERT IGNORE INTO books (isbn, name, genre, year_of_publication, publisher_id, author_id, description, amount)
      VALUES (8888, 'Test Book', 'Fiction', 2022, 1, 1, 'A test book', 5)
    `);
  });

  beforeEach(async () => {
    await db.query(
      `DELETE FROM borrowings WHERE student_id = 100 AND isbn = 8888`
    );
  });

  afterAll(async () => {
    await db.query(
      `DELETE FROM borrowings WHERE student_id = 100 AND isbn = 8888`
    );

    await db.query(`DELETE FROM books WHERE isbn = 8888`);

    await db.query(`DELETE FROM authors WHERE id = 100`);
    await db.query(`DELETE FROM publishers WHERE id = 100`);

    await db.query(`DELETE FROM users WHERE id = 100`);

    await db.end?.();
  });

  test("should add a new borrowing", async () => {
    const response = await request(app).post("/api/borrowings/add").send({
      student_id: 100,
      isbn: 8888,
    });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toMatch(/borrowed/i);
  });

  test("should return error when missing fields", async () => {
    const response = await request(app).post("/api/borrowings/add").send({
      student_id: 100,
    });

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("error");
  });
  test("should not allow borrowing if user already borrowed the book", async () => {
    await request(app).post("/api/borrowings/add").send({
      student_id: 100,
      isbn: 8888,
    });

    const response = await request(app).post("/api/borrowings/add").send({
      student_id: 100,
      isbn: 8888,
    });

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toMatch(/already has the book/i);
  });

  test("should not allow borrowing if user owes fines", async () => {
    await db.query(`
    INSERT INTO borrowings (student_id, isbn, return_date, returned_status, borrow_date, fine)
    VALUES (100, 8888, DATE_SUB(NOW(), INTERVAL 30 DAY), 'late', DATE_SUB(NOW(), INTERVAL 60 DAY), 5.0)
  `);

    const response = await request(app).post("/api/borrowings/add").send({
      student_id: 100,
      isbn: 8888,
    });

    expect(response.statusCode).toBe(403);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toMatch(/owes .* KM in fines/i);

    await db.query(`DELETE FROM borrowings WHERE student_id = 100`);
  });

  test("should not allow borrowing more than 3 books", async () => {
    for (let i = 1; i <= 3; i++) {
      const isbn = 8880 + i;

      await db.query(
        `
      INSERT IGNORE INTO books (isbn, name, genre, year_of_publication, publisher_id, author_id, description, amount)
      VALUES (?, 'Book${i}', 'Genre', 2022, 1, 1, 'Test book ${i}', 5)
    `,
        [isbn]
      );

      await db.query(
        `
      INSERT INTO borrowings (student_id, isbn, return_date, returned_status, borrow_date)
      VALUES (100, ?, DATE_ADD(NOW(), INTERVAL 30 DAY), 'borrowed', NOW())
    `,
        [isbn]
      );
    }

    const response = await request(app).post("/api/borrowings/add").send({
      student_id: 100,
      isbn: 8888,
    });

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toMatch(/has 3 books already borrowed/i);

    await db.query(`DELETE FROM borrowings WHERE student_id = 100`);
    await db.query(`DELETE FROM books WHERE isbn IN (8881, 8882, 8883)`);
  });

  test("should not allow borrowing if book is unavailable", async () => {
    await db.query(`UPDATE books SET amount = 0 WHERE isbn = 8888`);

    const response = await request(app).post("/api/borrowings/add").send({
      student_id: 100,
      isbn: 8888,
    });

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toMatch(/not available/i);

    await db.query(`UPDATE books SET amount = 5 WHERE isbn = 8888`);
  });
});
