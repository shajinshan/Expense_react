import React, { useEffect, useState } from 'react';
import './css/Update.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function Update() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [values, setValues] = useState({
        id: id,
        title: '',
        description: '',
        cost: ''
    });

    useEffect(() => {
        axios.get(`http://localhost:8082/start/get/${id}`)
            .then((result) => {
               
                setValues(prevValues => ({
                    ...prevValues,
                    title: result.data.title,
                    description: result.data.description,
                    cost: result.data.cost
                }));
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    function onChange(e) {
        setValues(prevValues => ({
            ...prevValues,
            [e.target.name]: e.target.value
        }));
    }

    function onUpdate(e) {
        e.preventDefault();
        
       
        axios.put(`http://localhost:8082/start/update/${id}`, values)
            .then((result) => {
               navigate('/')
                
            })
            .catch((error) => {
                alert(error)
            });
            navigate('/')
    }
    

    return (
        <div>
            <div className='containerss'>
                <h1>Edit Expense</h1>

                <div>
                    <form onSubmit={onUpdate}>
                        <select
                            className='tittle'
                            name='title'
                            value={values.title}
                            onChange={onChange}
                        >
                            <option value=''>Select Title</option>
                            <option value='Food'>Food</option>
                            <option value='Transport'>Transport</option>
                            <option value='Groceries'>Groceries</option>
                            <option value='Entertainment'>Entertainment</option>
                            <option value='Shopping'>Shopping</option>
                            <option value='Health'>Health</option>
                            <option value='Other'>Other</option>
                        </select>

                        <textarea
                            placeholder='Description'
                            name='description'
                            value={values.description}
                            onChange={onChange}
                        ></textarea>

                        <input
                            placeholder='Cost'
                            type='number'
                            required
                            name='cost'
                            value={values.cost}
                            onChange={onChange}
                        />

                        <button type='submit'>Update</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Update;
