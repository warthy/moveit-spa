import React from 'react'

import './Home.css'
import logo from'./images/LogoMoveItV1.png'


function Home(){

    return(
        <div className="Home">

            <div id="logo">
               <img src={logo} alt="logo"></img>
                
             </div>
        
        <div  id="firstButton">
          
          
   
                <button id="button1"><a href="/inscription" id="creerCompte">Créer un compte</a></button>
  
           

              

      
           
        </div>
        
                 <p>Déjà un compte ? <a href="/connexion" id="alreadyAccount">Connectez-vous</a></p>
        

            





        </div>
    )
}

export default Home;