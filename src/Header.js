import React from 'react'
import './Header.css'
import miniLogo from './PictoLogoV1.png'



function Header(){

    return(
        <div className="Header">
           
      <nav>
      <div class="main_pages">

    
            <a className="btn-header">HOME</a>

           

 
            <a className="btn-header">MESSAGERIE</a>
           
            <img id="mini-logo" src={miniLogo} />

 
            <a className="btn-header">EMPLOI DU TEMPS</a>
          


            <a className="btn-header">PROFIL</a>
           

            </div>

            </nav>
           
           
        </div>

    );


}

export default Header;
