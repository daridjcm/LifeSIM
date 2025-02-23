import "./css/index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Game from "./pages/Game.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import NotFound from "./pages/404Error.jsx";
import NewCustomer from "./pages/NewCustomer.jsx";
import Chat from "./components/ContentModal/Work/Chat/Chat.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route index element={<Game />} />
        <Route path="boss" element={<Chat people="boss" />} />
        <Route path="analia" element={<Chat people="analia" />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="customers/new" element={<NewCustomer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
