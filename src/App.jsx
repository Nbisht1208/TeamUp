import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import SignupPage from './Pages/SignupPage'
import { Routes ,Route} from 'react-router-dom'
import Home from './Home'
import LoginPage from './Pages/LoginPage'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage/>} />
      </Routes>
    </>
  )
}

export default App
