import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

require('dotenv').config();

const app = express();



const dbUrl = `mysql://${process.env.MYSQLUSER}:${process.env.MYSQLPASSWORD}@${process.env.MYSQLHOST}:${process.env.MYSQLPORT}/${process.env.MYSQLDATABASE}`;



//Configurations to Connect to Backend Mysql Server
const db = mysql.createConnection(dbUrl)

//Send Json File using a Client
app.use(express.json());
//Cors Library
app.use(cors())

app.get("/", (req, res) => {
    res.json("Hello This is the Backend")
})

//Get all books from books table
app.get("/getAllBooks", (req, res) => {
    const q = "SELECT * FROM books";
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

//Create a new book
app.post("/createNewBook", (req, res) => {
    const q = "INSERT INTO books (`title`, `description`, `cover`, `price`) VALUES (?)"
    const values = [
        req.body.title,
        req.body.description,
        req.body.cover,
        req.body.price,
    ];
    db.query(q,[values], (err, data) => {
        if (err) return res.json(err);
        return res.json("Book has been created successfully.");
    })
});

//Delete A Book From Database
app.delete("/deleteBooks/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "DELETE FROM books WHERE id=?";

    db.query(q, [bookId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Book has been deleted successfully.");
    })
})

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
app.patch("/updateBook/:id", (req, res) => {
    const bookId = req.params.id;
    const fields = req.body;

    // If nothing is provided in the body
    if (Object.keys(fields).length === 0) {
        return res.status(400).json({ error: "No fields provided for update." });
    }

    // Build dynamic SET clause
    const setClause = Object.keys(fields).map(key => `${key} = ?`).join(", ");
    const values = Object.values(fields);

    const q = `UPDATE books SET ${setClause} WHERE id = ?`;

    db.query(q, [...values, bookId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("Book has been updated successfully.");
    });
});


app.listen(8800, () => console.log(`Listening on 8800. Connected to backend wueh`));