import './App.css'
import LoginPage from './pages/login.jsx';
import SignUp from './pages/signup';
import HomePage from './pages/home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Header from './components/header.jsx';
import AdminPage from './pages/adminPage.jsx';
import TestPage from './pages/testPage.jsx';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Toaster position='top-right' />
        {/* <Header /> */}
        <Routes path="/*">
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/admin/*" element={<AdminPage />} />
          <Route path="/testing" element={<TestPage />} />


          <Route path="/*" element={<h1 className='text-4xl text-center mt-20'>404 Not Found</h1>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
