import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Login from './pages/login'
import NotFound from './pages/notFound';
import Home from './pages/home';
import Navbar from './components/Navbar'

function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login />}/>
      <Route path='/home/' element={<Navbar />}>
        <Route index element={<Home />} />
      </Route>
      <Route path='*' element={<NotFound />}/>
    </Routes>
  );
}

export default App;
