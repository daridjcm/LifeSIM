import './css/index.css'
import './css/output.css'
import { BrowserRouter, Routes, Route } from "react-router"

import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'

function App() {
  return(
    <BrowserRouter>
        <Routes>
          <Route index element={<SignUp />} />
          <Route path='login' element={<Login />} />
        </Routes>
      </BrowserRouter >
  )
}

export default App;
