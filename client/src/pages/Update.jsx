import React from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";

const Update = () => {

    //Take values from the input
    const [inputs, setInputs] = React.useState({
        title: '',
        description: '',
        price: null,
        cover: " ",

    });

    // To use React navigate Function
    const navigate = useNavigate();

    //Use React Location Hook to get book id
    const location = useLocation();
    const bookId = location.pathname.split("/")[2]


    // Handle all the user Inputs
    const handleChange = (e) => {
        setInputs( (prev) => ({ ...prev, [e.target.name]: e.target.value }) );
    }

    //Handle the Update Button Click
    const handleClick = async (e) => {
        e.preventDefault();

        // remove empty / null values
        const filteredInputs = Object.fromEntries(
            Object.entries(inputs).filter(([_, v]) => v !== '' && v !== null && v !== " ")
        );

        try {
            await axios.patch(`http://localhost:8800/updateBook/${bookId}`, filteredInputs);
            navigate("/")
        }catch(err) {
            console.log(err);
        }
    }

    return (
        <div className='form'>
            <h1>Update The Book</h1>
            <input type="text" placeholder="Title" onChange={handleChange} name="title"/>
            <input type="text" placeholder="Description" onChange={handleChange} name="description"/>
            <input type="text" placeholder="Cover" onChange={handleChange} name="cover"/>
            <input type="Number" placeholder="Price" onChange={handleChange} name="price"/>

            <button className="formButton" onClick={handleClick}>Update</button>
        </div>
    )
}
export default Update
