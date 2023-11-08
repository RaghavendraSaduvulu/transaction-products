const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const app = express();
const path = require("path");
app.use(express.json());
const dbPath = path.join(__dirname, "transactions.db");
let db = null;

const initilizeDb = async () => {
  db = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  });
  app.listen("4000", () => {
    console.log("Server running at http://localhost:3001");
  });
};

initilizeDb();

app.get("/create", async (request, response) => {
  const createTable = `
    CREATE TABLE products (
      id NUMBER NOT NULL,
      title VARCHAR(200),
      price FLOAT,
      description VARCHAR(500),
      category TEXT,
      image VARCHAR(200),
      sold BOOLEAN,
      data_of_sale DATETIME
    )
  `;
  const data = await db.run(createTable);
  response.send("Table create successfully");
});

app.post("/add", async (request, response) => {
  const data = request.body;
  const { id, title, price, description, category, image, sold, dataOfSale } =
    data;
  const addData = `
    INSERT into products (
      id,
      title,
      price,
      description,
      category,
      image,
      sold,
      data_of_sale
    ) VALUES (
      ${id},
      '${title}',
      ${price},
      '${description}',
      '${category}',
      '${image}',
      ${sold},
      '${dataOfSale}'
    );
  `;
  const responseData = await db.exec(addData);
  response.send("added ");
});
