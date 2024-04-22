import React from 'react'
import './Admine.css';
import Sidebar from '../../Components/Siderbar/Sidebar.jsx'
import { Route, Routes } from 'react-router-dom';
import AddProduct from '../../Components/AddProduct/AddProduct.jsx';
import ListProduct from '../../Components/ListProduct/ListProduct.jsx';
const Admine = () => {
  return (
    <div className='Admine'>
     <Sidebar/>
     <Routes>
      <Route  path="/addProduct" element={<AddProduct/>}></Route>
      <Route  path="/listproduct" element={<ListProduct/>}></Route>
      </Routes>
    </div>
  )
}

export default Admine