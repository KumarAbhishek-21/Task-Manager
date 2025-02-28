// import './App.css';
import LoginPopUp from "./Pages/LoginPopUp";
import Navbar from "./Pages/Navbar";
// import AuthPage from './Pages/LoginPopUp';
import TaskManager from "./TaskManager";
import { useState } from "react";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <div>
      {showLogin ? <LoginPopUp setShowLogin={setShowLogin} /> : <></>}
      <Navbar setShowLogin={setShowLogin} />
      <div className="App">
        {/* <LoginPopUp /> */}
        <TaskManager setShowLogin= {setShowLogin}/>
      </div>
    </div>
  );
}

export default App;
