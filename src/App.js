
import { Link, useNavigate } from 'react-router-dom';
import './App.css';
import React from 'react';
import Quiz from './Quiz';

function App() {
 
  return (
    <div className="App">
     {/* <Link to={'/quiz'}><button>Quiz App</button></Link>  */}
      <Quiz/>
    </div>
  );
}

export default App;
