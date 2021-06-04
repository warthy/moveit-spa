import React from 'react'
import {Link} from 'react-router-dom'
import './Home.css'
import logo from'./images/LogoMoveItV1.png'


function Home(){

    return(
        <div className="Home">

            <div id="logo">
               <img src={logo} alt="logo"></img>
                
             </div>
        
        <div  id="firstButton">
            <Link to="/inscription">
          
   
                <button id="button1"><a id="creerCompte">Créer un compte</a></button>
  
            </Link>

            <Link to="/inscription">
                <button id="button2"><a id="accountFb">S'inscrire sur facebook </a></button>

      
            </Link>
        </div>
            <Link to="/connexion">
                 <p>Déjà un compte ? <a id="alreadyAccount">Connectez-vous</a></p>
            </Link>

            





        </div>
    )
}

export default Home;