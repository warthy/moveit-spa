import React, {Component} from 'react'
import Header from'./Header.js'
import './Profil.css'
import test from './PictoLogoV1.png';

import AuthService from "./service/auth.service";



export default class Profil extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentUser: AuthService.getCurrentUser()
        }
    }

    render(){

    return(
        <div className="Profil">
              <Header />

              <div id="firstInfoProfil">
                    <div id="nomPhoto">
                        <img src={test} id="photoProfil" />
                        <h2 className="infoPersonn">NOM DE LA PERSONNE</h2>

                    </div>

                    <div id="ageMailLieu">
                        <p className="infoPersonn">Age dela personne</p>
                        <p className="infoPersonn">Mail de la personne</p>
                        <p className="infoPersonn">Lieu de la personne</p>

                    </div>


              </div>

              <div id="secondInfoProfil">
                  <p><span>Centres d'intéret : </span>dkgng dqgkdgk qsodkgkdg qkosgkqdg qkgkgd</p>

                  <h3>Description</h3>

                  <p>dskjf qdf  qsfkf qkfgopk qokspfokqdg qokFDK Qokgkq qkofgk QOSKFQKDGF oqkfgKKQG KQSDKOF GSQDK GKFKG  KQKKkf,d </p>


              </div>
        </div>
        

    );

}

}


