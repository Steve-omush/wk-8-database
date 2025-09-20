import express from 'express';
import mysql from "mysql2/promise";
import cors from 'cors';
import dotenv from "dotenv";


const app = express();

//To be able to read .env file
dotenv.config();



// Declare db outside so it's accessible globally
let db;

//Configurations to Connect to Backend Mysql Server

const initDB = async () => {
    try {
        db = await mysql.createConnection(process.env.MYSQL_URL);
        console.log("✅ Connected to database");

        // test query
        const [rows] = await db.query("SELECT NOW() AS now");
        console.log("DB time:", rows[0].now);
    } catch (err) {
        console.error("❌ Database connection failed:", err.message);
    }
};

await initDB();


//Send Json File using a Client
app.use(express.json());
//Cors Library
app.use(cors())

app.get("/", (req, res) => {
    res.json("Hello This is the Backend")
})

//Get all books from books table
app.get("/getAllBooks", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM books");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//Create a new book
app.post("/createNewBook", async (req, res) => {
    try {
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
//Delete A Book From Database
app.delete("/deleteBooks/:id", async (req, res) => {
    try {
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


//Update A Book
// app.put("/updateBook/:id", (req, res) => {
//     const bookId = req.params.id;
//     const q = "UPDATE books SET `title` = ?, `description` = ?, `cover` = ?, `price` = ? WHERE id=?";
//
//     const values = [
//         req.body.title,
//         req.body.description,
//         req.body.cover,
//         req.body.price,
//     ];
//     db.query(q, [...values, bookId], (err, data) => {
//         if (err) return res.json(err);
//         return res.json("Book has been updated successfully.");
//     })
// })

//Allow Partial Update(Not all fields)
app.patch("/updateBook/:id", async (req, res) => {
    try {
        const bookId = req.params.id;
        const fields = req.body;

        // If nothing is provided in the body
        if (Object.keys(fields).length === 0) {
            return res.status(400).json({ error: "No fields provided for update." });
        }

        // Build dynamic SET clause
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


app.listen(process.env.PORT || 8800, () =>
    console.log(`Listening on port ${process.env.PORT || 8800}. Connected to backend wueh ✅`)
);
