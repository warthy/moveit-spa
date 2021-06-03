import React, {Component} from 'react'
import Header from'./Header.js'
import './Profil.css'
import test from './PictoLogoV1.png';

import AuthService from "./service/auth.service";
import axios from "axios";



const API_URL2 = "http://localhost:8080/user/";
const user = JSON.parse(localStorage.getItem('user'));
export default class Profil extends Component {

    constructor(props) {
        super(props);

       
       this.state = {
          currentUser:[]
          
       };
    }
 componentDidMount(){
           this.getData();



           
            
        
         
      
       

       }
       async getData(){

       
        
        
  
       
        const response = axios.get(API_URL2 + "me",{ headers:{
            Authorization: `Bearer  ${user}`,
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          },
         }) 
         
         const {data} = await response;
         this.setState({currentUser: data})

        }
    

       
       


    
   

    render(){
      

    return(
        <div className="Profil">
              <Header />

              <div id="Partit_haute">
                    <div>
                        <img src={test} alt="photo de profil" id="photoProfil" />
                    </div>


                    <div>
                        <h2 className="infoPersonn">  {this.state.currentUser.firstName} {this.state.currentUser.lastName}  </h2>
                  
                    </div>

               

                      <div>
                          
                        <p className="infoPersonn">{this.state.currentUser.username}</p>
                        
                       
                        <p className="infoPersonn">{this.state.currentUser.email}</p>

                        

                       
                        <p className="infoPersonn">Lieu de la personne</p>
                        
                        </div>

                    

                </div>
          

              <div id="secondInfoProfil">
                  <p><span>Centres d'intéret : </span>dkgng dqgkdgk qsodkgkdg qkosgkqdg qkgkgd</p>
                  </div>

                  <div id="troisiemeInfoProfil">
                 
                  <h3>Description</h3><br></br><br></br>

                  <p >dskjf qdf  qsfkf qkfgopk qokspfokqdg qokFDK Qokgkq qkofgk QOSKFQKDGF oqkfgKKQG KQSDKOF GSQDK GKFKG  KQKKkf,d </p>
                  </div>

             
        </div>
        

    );

}

}


