import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./User/Register";
import LoginPage from "./User/Login";


function App() {
  return (
  
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
       
      </Routes>

  );
}

export default App;
