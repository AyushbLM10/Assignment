import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route path='/' element= {<Home/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </BrowserRouter>
      <Toaster />

    </div>
  )
}

export default App