import logo from './logo.svg';
import './App.css';
import Homepage from './components/Homepage';
import AddNewItems from './components/AddNewItems';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Update from './components/Update';

function App() {
  return (
    
   <BrowserRouter>
   <div>
   <Routes>
    <Route path='/' element={<Homepage/>}/>
    <Route path='/addnew' element={<AddNewItems/>}/>
    <Route path='/update/:id' element={<Update/>}/>
   </Routes>
   </div>
   </BrowserRouter>
  );
}

export default App;
