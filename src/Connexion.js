import React from 'react'
import './Connexion.css'
import cadenas from'./cadenas.png'
import user from'./user.png'
import fleche from './fleche.png'
import {Link} from 'react-router-dom'

function Connexion(){

    return(
        <div className="Connexion">

            <Link to="/">
                <img id="fleche2" src={fleche} />

            </Link>
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
        <div >
        <a  id="mdp" href="#">Mot de passe oublié ?</a>
        </div>

       
        </form>

        </div>
    )
}

export default Connexion;