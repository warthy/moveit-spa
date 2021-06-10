import React, {Component} from 'react'
import Header from'./Header.js'
import './Profil.css'
import userProfil from './images/PictoLogoV1.png';

import Modal from './composants/Modal';


import axios from "axios";




const API_URL2 = "http://localhost:8080/user/";
const user = JSON.parse(localStorage.getItem('user'));


export default class Profil extends Component {

    constructor(props) {
        super(props);

       
       this.state = {
          currentUser:[],
          users:[],
          show:false,
          
       };
    }
 componentDidMount(){
           this.getData();
           this.getAllUser();

    
}

showModal=()=>{
    this.setState({
        show:true
    });
}

hideModal = ()=>{

    this.setState({
        show:false
    })
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

async getAllUser(){
    const response = axios.get("http://localhost:8080/user", {headers:{
        Authorization: `Bearer  ${user}`,
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    },

})

const {data} = await response;
this.setState({users: data})

}


    

       
       


    
   

    render(){
        const {users}=this.state;
        
        
        

        
      

    return(
        <div className="Profil">
              <Header />

              <div id="Partit_haute">
                    <div>
                   
                        <img src={userProfil} alt="photo de profil" />
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

                  <a href="/activityUser">Voir mes activités</a>

            
                  <div>
                    <ul>
                        {users.map(user=>(
                            <li key={user.id}>{user.id}

                            <a href={"/user/"+user.id} onClick={this.getOneUser}>Voir profil</a>

                            </li>
                        ))}

                    </ul>

                  </div>

                 <button  type="button" class="btn btn-warning" onClick={this.showModal}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
</svg>  Editer son profil</button>
                 <Modal 
                 show={this.state.show}
                 hideModal={this.hideModal}
                 />
        </div>

   
        

    );

}

}


