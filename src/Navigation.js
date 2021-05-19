import React from 'react'
import {Link} from 'react-router-dom'


function Navigation(){

    return(
        <ul>

            <Link to="/">
            <li>Home</li>

            </Link>

            <Link to="/connexion">
            <li>Connexion</li>
            </Link>


            <Link to="/inscription">
            <li>Inscription</li>

            </Link>

        </ul>
    )
}

export default Navigation;