
import './App.css';

import Home from'./Home';
import Connexion from './Connexion'
import Inscription from './Inscription'
import Navigation from './Navigation'
import {BrowserRouter as Router, Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
    
      <Router>
     
      <Route path="/" exact component={Home}/>
      <Route path="/connexion" exact component={Connexion}/>
      <Route path="/inscription" exact component={Inscription}/>


      </Router>

     </div>
  );
}

export default App;
