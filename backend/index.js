import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
dotenv.config();

let db;

const initDB = async () => {
  try {
    db = await mysql.createConnection(process.env.MYSQL_URL);
    console.log("✅ Connected to database");

    // test query
    const [rows] = await db.query("SELECT NOW() AS now");
    console.log("DB time:", rows[0].now);
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
    // Don’t crash the app – keep running
  }
};

initDB(); // no await

// middleware
app.use(express.json());
app.use(cors());

// root route
app.get("/", (req, res) => {
  res.json("Hello This is the Backend");
});

// get all books
app.get("/getAllBooks", async (req, res) => {
  try {
    if (!db) throw new Error("Database not connected");
    const [rows] = await db.query("SELECT * FROM books");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// create new book
app.post("/createNewBook", async (req, res) => {
  try {
    if (!db) throw new Error("Database not connected");
    const q =
      "INSERT INTO books (`title`, `description`, `cover`, `price`) VALUES (?)";
    const values = [
      req.body.title,
      req.body.description,
      req.body.cover,
      req.body.price,
    ];
    await db.query(q, [values]);
    res.json("Book has been created successfully.");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// delete book
app.delete("/deleteBooks/:id", async (req, res) => {
  try {
    if (!db) throw new Error("Database not connected");
    const bookId = req.params.id;
    const q = "DELETE FROM books WHERE id = ?";
    const [result] = await db.query(q, [bookId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Book not found." });
    }

    res.json("Book has been deleted successfully.");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// patch update
app.patch("/updateBook/:id", async (req, res) => {
  try {
    if (!db) throw new Error("Database not connected");
    const bookId = req.params.id;
    const fields = req.body;

    if (Object.keys(fields).length === 0) {
      return res.status(400).json({ error: "No fields provided for update." });
    }

    const setClause = Object.keys(fields)
      .map((key) => `${key} = ?`)
      .join(", ");
    const values = Object.values(fields);

    const q = `UPDATE books SET ${setClause} WHERE id = ?`;
    const [result] = await db.query(q, [...values, bookId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Book not found." });
    }

    res.json("Book has been updated successfully.");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// start server
const PORT = process.env.PORT || 8800;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
