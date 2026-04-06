import React from 'react';
import Home from './pages/Home';
import Login from './features/auth/Login';
import { Routes, Route } from 'react-router-dom';

import MenuDetail from './features/meal/components/MenuDetail';
import Register from './features/auth/Register';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu/:id" element={<MenuDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

export default App;
