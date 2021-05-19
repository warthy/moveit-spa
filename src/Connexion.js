import React from 'react'
import './Connexion.css'
import cadenas from'./cadenas.png'
import user from'./user.png'


function Connexion(){

    return(
        <div className="Connexion">
        <h1>Connexion</h1>

        <form >


    <div id="formConnexion"> 
        <label for="email">  <img id="user" src={user}/>
        <input 
        type="text" 
        name="email"
        id="email"
        placeholder="Mail"
       
       required></input></label>


      
        <label for="paswword">  <img id="cadenas" src={cadenas}/>
                <input 
                type="password" 
                name="password" 
                id="password"
                placeholder="Mot de passe"
                
                 required></input>
        </label>
        
        </div>
        <button>Se connecter</button>
        <div>
        <a href="#">Mot de passe oublié ?</a>
        </div>

       
        </form>

        </div>
    )
}

export default Connexion;