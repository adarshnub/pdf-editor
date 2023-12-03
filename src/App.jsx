import {Routes,Route} from "react-router-dom";

import './App.css'
import AuthLayout from "./components/auth/AuthLayout";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import RootLayout from "./components/root/RootLayout";
import Home from "./components/root/Home";



function App() {
  

  return (
  

  <main className="flex h-screen">
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register"  element={<RegisterForm />} />
      </Route>

      <Route element={<RootLayout />} >
        <Route index element={<Home />} />
      </Route>
    </Routes>
  </main>
  
  
  )
}

export default App
