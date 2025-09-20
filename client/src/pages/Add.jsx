import React from 'react'
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Add = () => {

    //Take values from the input
    const [inputs, setInputs] = React.useState({
        title: '',
        description: '',
        price: null,
        cover: " ",

    });

    // To use React navigate Function
    const navigate = useNavigate();

    // Handle all the user Inputs
    const handleChange = (e) => {
        setInputs( (prev) => ({ ...prev, [e.target.name]: e.target.value }) );
    }

    //Handle the Add Button Click
    const handleClick = async (e) => {
        e.preventDefault();
        try {
            // ✅ use environment variable + endpoint
            await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/createNewBook`,
                inputs
            );
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='form'>
            <h1>Add New Book</h1>
            <input type="text" placeholder="Title" onChange={handleChange} name="title"/>
            <input type="text" placeholder="Description" onChange={handleChange} name="description"/>
            <input type="text" placeholder="Cover" onChange={handleChange} name="cover"/>
            <input type="Number" placeholder="Price" onChange={handleChange} name="price"/>

            <button className="formButton" onClick={handleClick}>Add</button>
        </div>
    )
}
export default Add
