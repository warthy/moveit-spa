
import './App.css';

import Home from'./Home';
import Connexion from './Connexion'
import Inscription from './Inscription'
//import Navigation from './Navigation'
import AddActivities from './AddActivities'
import Profil from './Profil'
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";

import AuthService from "./service/auth.service";

let token=false;
function App() {

 
  const authentifié = localStorage.getItem('user');
  if(authentifié){
   
    AuthService.getCurrentUser()
    token=true;
  }else{
    token=false;
  
  }
  return (
    <div className="App">
    
      <Router>
     
      <Route path="/" exact component={Home}/>
      <Route path="/connexion" exact component={Connexion}/>
      <Route path="/inscription" exact component={Inscription}/>
      <Route path="/addActivities"render={()=>(token ? (<Route component={AddActivities} />) : 
      (<Redirect to='/' />))}/>
      <Route path="/profil" render={()=>(token ? (<Route component={Profil} />) :
      (<Redirect to='/' />))}/>


      </Router>

     </div>
  );
}

export default App;
