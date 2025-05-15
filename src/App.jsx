import './App.css'
import LoginPage from './pages/login.jsx';

import HomePage from './pages/home';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/header.jsx';
import AdminPage from './pages/adminPage.jsx';
import TestPage from './pages/testPage.jsx';
import Register from './pages/register.jsx';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Toaster position='top-right' />
        <Header />
        <Routes path="/*">
          {/* // this will redirect to login page if the user is not logged in */}
          {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}
          {/* // this will redirect to login page if the user is not logged in */}
          {/* <Route path="/" element={<LoginPage />} /> */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />

          <Route path="/admin/*" element={<AdminPage />} />
          <Route path="/testing" element={<TestPage />} />

          <Route path="/*" element={<HomePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
