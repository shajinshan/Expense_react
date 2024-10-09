import React, { useEffect, useState } from 'react'
import '../components/css/Homepagecss.css'
import axios from 'axios';
import AddNewItems from './AddNewItems';
import { Link, Navigate, useNavigate } from 'react-router-dom';



function Homepage() {
  const navigate = useNavigate();
  const [expense, setExpense] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    axios.get("http://localhost:8082/start/readAll")


      .then((result) => {
        setExpense(result.data)

      })
      .catch((error) => {
        setError(error.message)

      })
  }, [])

  function clickS() {
    navigate('/addnew')
  }

  function navigateUpdate(){
    navigate('/update')
  }

  function deleteItem(id) {
    axios
      .delete(`http://localhost:8082/start/delete/${id}`)
      .then((response) => {
        console.log(response.data);
        // Remove the deleted item from the state to update UI
        setExpense(expense.filter((item) => item.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting item:', error);
      });
  }

  return (

    <div>
      {
        error ? (
          
          <h2>Error: {error}</h2>
        )
          : expense.length == 0 ? 
         
          <div className='containe'>
            <h1 className='empty'>Empty Add newExpense</h1>
            <div className='add_icon'>
                <button onClick={clickS}>
                  <img src='https://img.icons8.com/?size=100&id=87752&format=png&color=000000' >
                  </img>
                </button>
              </div>
              
              </div>
              : //not empty
          (
            <div>
              <div className='add_icon'>
                <button onClick={clickS}>
                  <img src='https://img.icons8.com/?size=100&id=87752&format=png&color=000000' >
                  </img>
                </button>
              </div>
              <div className='container'>

                <h1 className='heading'>Expense Tracker</h1>



                {
                  expense.map((e) => {
                    return (

                      <li key={e.id}>

                        <div className='expense_box'>
                          <h3><span style={{ color: 'black' }}>Tittle : </span>{e.title}</h3>




                          <div className='description_box'>
                            <h5>{e.description}</h5>

                          </div>
                          <h4>Cost :{e.cost} Rs</h4>
                          <h6>Date :{e.date}</h6>
                          <div className='edit_icon'>
  <Link to={`/update/${e.id}`}>
    <img src='https://img.icons8.com/?size=100&id=C5TmG5br9gjf&format=png&color=000000' alt='Edit Icon' />
  </Link>
</div>
<div className='delete_icon'>
                <button onClick={() => deleteItem(e.id)}>
                  <img src='https://img.icons8.com/?size=100&id=11705&format=png&color=000000' >
                  </img>
                </button>
              </div>

                          
                        </div>
                      </li>
                    )
                  })
                }
              </div>
            </div>
          )}
    </div>
  )
}

export default Homepage