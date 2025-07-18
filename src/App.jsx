import './App.css'
import LoginPage from './pages/login.jsx';

import HomePage from './pages/home';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/header.jsx';
import AdminPage from './pages/adminPage.jsx';
import TestPage from './pages/testPage.jsx';
import Register from './pages/register.jsx';
import { Toaster } from 'react-hot-toast';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ForgotPassword from './pages/forgotPassword.jsx';

function App() {
  return (
    <GoogleOAuthProvider clientId="174486857277-64cjgecjou0du2f35vpsm0fabkeqvmj3.apps.googleusercontent.com">
      <BrowserRouter>
        <div>
          <Toaster position='top-right' />
          <Header />
          <Routes >
            {/* // this will redirect to login page if the user is not logged in */}
            {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}
            {/* // this will redirect to login page if the user is not logged in */}
            {/* <Route path="/" element={<LoginPage />} /> */}
            <Route path="*" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            <Route path="/register" element={<Register />} />

            <Route path="/admin/*" element={<AdminPage />} />
            <Route path="/testing" element={<TestPage />} />

            <Route path="/*" element={<HomePage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

export default App
