import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

import Registration from "./screens/Registration.Screen.jsx";
import Home from "./screens/Home.Screen.jsx";

import Login from "./components/Login.Component.jsx";
import Signup from "./components/Signup.Component.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Registration />}>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Signup />} />
        </Route>
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App;