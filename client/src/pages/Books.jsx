import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

const Books = () => {

    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchAllBooks = async () => {
            try{
                const res = await axios.get("http://localhost:8800/getAllBooks")
                setBooks(res.data);
                console.log(res.data);
            }catch(err){
                console.log(err);
            }
        }
        fetchAllBooks();
    }, [])

    //Handle the Delete Button
    const handleDelete = async (id) => {
        try{
            await axios.delete(`http://localhost:8800/deleteBooks/${id}`)
            window.location.reload();
        }catch(err){
            console.log(err);
        }
    }

    return (
        <div>
            <h1>Steve Book Shop</h1>
            <div className="books">
                {books.map((book) => (
                    <div className="book" key={book.id}>
                        {book.cover && <img src={book.cover} alt="cover"/>}
                        <h2>{book.title}</h2>
                        <p>{book.description}</p>
                        <span>{book.price}</span>
                        <button className="delete" onClick={() => handleDelete(book.id)}>Delete</button>
                        <button className="update"><Link to={`/update/${book.id}`}>Update</Link></button>
                    </div>
                ))}
            </div>
            <button className="addNewBook">
                <Link to={"/add"}>Add New Book</Link>
            </button>
        </div>
    )
}
export default Books
