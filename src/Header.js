import React from 'react'
import './Header.css'
import miniLogo from './images/PictoLogoV1.png'



function Header(){

    return(
        <div className="Header">
           
      <nav>
      <div class="main_pages">

    
            <a href="/home" className="btn-header">HOME</a>

           

 
            <a href="/" className="btn-header">MESSAGERIE</a>
           
            <img id="mini-logo" src={miniLogo} alt="logo"/>

 
            <a href="/emploi" className="btn-header">EMPLOI DU TEMPS</a>
          


            <a href="/profil" className="btn-header">PROFIL</a>
           

            </div>

            </nav>
           
           
        </div>

    );


}

export default Header;
