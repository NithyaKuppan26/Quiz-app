
import { Link, useNavigate } from 'react-router-dom';
import './App.css';
import React from 'react';

function App() {
 
  return (
    <div className="App">
     <Link to={'/quiz'}><button>Quiz App</button></Link> 
      
    </div>
  );
}

export default App;
