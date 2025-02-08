import "./css/index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Game from "./pages/Game.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import NotFound from "./pages/404Error.jsx";
import NewCustomer from "./pages/NewCustomer.jsx";


function App() {
  // TODO: Add page to routes that do not exist yet (404).
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route index element={<Game />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="customers/new" element={<NewCustomer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
