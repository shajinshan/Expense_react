import React, { useState } from 'react'
import './css/additem.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddNewItems() {
    const navigate = useNavigate();
    const [add,setAdd]=useState([{title:'',description:'',cost:''}]);

    function onInputRead(e){
        setAdd({...add,[e.target.name]:e.target.value})
    }

    function onSubmit(i){
        
        i.preventDefault()
axios.post("http://localhost:8082/start/additems",add)

.then((result)=>{
navigate('/')
})
.catch((error)=>{
    alert(error)
})
    }
  return (
    <div>
    <div className='containerss'>
        <h1>Add New Expense</h1>

        <div>
            <form>
                <select className='tittle' name='title' onChange={onInputRead}>
                <option value={''}>select tittle</option>
                    <option value={'Food'}>Food</option>
                    <option value={'Transport'}>Transport</option>
                    <option value={'Groceries'}>Groceries</option>
                    <option value={'Entertainment'}>Entertainment</option>
                    <option value={'Shopping'}>Shopping</option>
                    <option value={'Health'}>Health</option>
                    <option value={'Other'}>Other</option>
                    
                </select>
                
                <textarea placeholder='Description' name='description' onChange={onInputRead}></textarea>
                <input placeholder='Cost' type='number'required name='cost' onChange={onInputRead}></input>

                <button onClick={onSubmit}>Add</button>
            </form>
        </div>
        </div>
        </div>
  )
}

export default AddNewItems