import Home from './components/home';
import ContactForm from './components/contactForm';
import './App.css';
import { Routes, Route, BrowserRouter as Router, } from "react-router-dom";
function App() {
  return (
      <Routes>
        <Route exact path='/' element={<Home/>} />

      </Routes>
 );
}

export default App;
