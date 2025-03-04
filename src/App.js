import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar';
import { Home } from './components/Home';
import {About} from './components/About';
import NotesState from './context/notes/NotesState';
import  Alert  from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';
function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 1500);
}


  return (
    <>
    <NotesState>
 <Router>
        <Navbar />
      <Alert alert={alert}/>
        <div className="container">
        <div className="container" style={{ backgroundColor: '' }}>
        <Routes>
          <Route  path="/" element={<Home showAlert={showAlert}/>}/>
          <Route  path="/about" element={ <About />}/>
          <Route  path="/login" element={ <Login  showAlert={showAlert}/>}/>
          <Route  path="/signup" element={ <Signup showAlert={showAlert} />}/>
        </Routes>
        </div>
        </div>
      </Router>
      </NotesState>
    </>
    
  );
}

export default App;
