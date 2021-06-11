import React, { Component } from "react";
import Header from "./Header.js";
import "./Profil.css";
import userProfil from "./images/PictoLogoV1.png";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

import axios from "axios";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import AuthService from './service/auth.service';
import Noty from 'noty';  
import "../node_modules/noty/lib/noty.css";  
import "../node_modules/noty/lib/themes/mint.css"; 
const API_URL2 = "http://localhost:8080/user/";
const user = JSON.parse(localStorage.getItem("user"));

let modalStyle;
export default class Profil extends Component {
  constructor(props) {
    super(props);

    this.submitUpdateInformation=this.submitUpdateInformation.bind(this);
    this.onChangeDescription=this.onChangeDescription.bind(this);
    this.onChangeUsername=this.onChangeUsername.bind(this);

    this.state = {
      currentUser: [],
      users: [],
      show: false,
      openModalFriend: false,
      openModalEdit:false,
      username:"",
      description:"",
    };
  }
  componentDidMount() {
    this.getData();
    this.getAllUser();
  }

  onChangeDescription(e){
    this.setState({
      description:e.target.value
    });
  }

  onChangeUsername(e){
    this.setState({
      username:e.target.value
    });
  }

  submitUpdateInformation(e){
    e.preventDefault();

    this.form.validateAll();

   if(this.state.description.length>0 && this.state.username.length>0){

   
    AuthService.editUser(
      this.state.username, 
      this.state.description
    )
    .then(response =>{
      return response

   
  },
  error =>{
      console.log(error)
  }
    )

   }

   new Noty({
    type:"success",
    layout:"centerRight",
    text:"Profil modifié aevc succès",
    timeout:3000
}).show();
     
  }

  rand() {
    return Math.round(Math.random() * 20) - 10;
  }

  getModalStyle() {
    const top = 50 + this.rand();
    const left = 50 + this.rand();

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  showModal = () => {
    alert("yo")
    this.setState({
      show: true,
    });
  };

  hideModal = () => {
    this.setState({
      show: false,
    });
  };
  showModalAmis = (e) => {
    e.preventDefault();
    this.setState({
      openModalFriend: true,
    });
  };

  onCloseModalFriend=()=>{
      this.setState({
          openModalFriend: false
      })
  }

  showModalEdit=(e)=>{
    e.preventDefault();
    this.setState({
      openModalEdit: true,
    })
  }

  onCloseModalEdit=()=>{
    this.setState({
      openModalEdit: false
    })
  }

  async getData() {
    const response = axios.get(API_URL2 + "me", {
      headers: {
        Authorization: `Bearer  ${user}`,
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    });

    const { data } = await response;
    this.setState({ currentUser: data });
    this.setState({
      username:data.username, 
      description:data.description
    })
  }

  async getAllUser() {
    const response = axios.get("http://localhost:8080/user", {
      headers: {
        Authorization: `Bearer  ${user}`,
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    });

    const { data } = await response;
    this.setState({ users: data });
  }

  render() {
    const { users } = this.state;
    let test;
    modalStyle = this.getModalStyle();
    if (this.state.show === true) {
      alert("fh")
      test = (
        <Modal
          style={modalStyle}
          show={this.state.show}
          hideModal={this.hideModal}
        />
      );
    }

    return (
      <div style={{ zIndex: 1 }} className="Profil">
        <Header />

        <div id="Partit_haute">
          <div>
            <img src={userProfil} alt="" />
          </div>

          <div>
            <h2 className="infoPersonn">
              {" "}
              {this.state.currentUser.firstName}{" "}
              {this.state.currentUser.lastName}{" "}
            </h2>
          </div>

          <div>
            <p className="infoPersonn">{this.state.currentUser.username}</p>

            <p className="infoPersonn">{this.state.currentUser.email}</p>

            <p className="infoPersonn">Lieu de la personne</p>
          </div>
        </div>

        <div id="secondInfoProfil">
          <p>
            <span>Centres d'intéret : </span>dkgng dqgkdgk qsodkgkdg qkosgkqdg
            qkgkgd
          </p>
        </div>

        <div id="troisiemeInfoProfil">
          <h3>Description</h3>
          <br></br>
          <br></br>
          {test}
          <p>
            dskjf qdf qsfkf qkfgopk qokspfokqdg qokFDK Qokgkq qkofgk QOSKFQKDGF
            oqkfgKKQG KQSDKOF GSQDK GKFKG KQKKkf,d{" "}
          </p>
        </div>

        <a href="/activityUser">Voir mes activités</a>

       

     <div id="buttonProfil">
        <button type="button" class="btn btn-dark" onClick={this.showModalAmis}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-plus-fill" viewBox="0 0 16 16">
  <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
  <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
</svg>  Ajouter des amis</button>

<button type="button" class="btn btn-warning" onClick={this.showModalEdit}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            class="bi bi-pencil-fill"
            viewBox="0 0 16 16"
          >
            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
          </svg>{" "}
          Editer son profil
        </button>

        </div>


        <Modal open={this.state.openModalEdit} onClose={this.onCloseModalEdit}>
        <div>

    
      <Form 
      onSubmit={this.submitUpdateInformation}
        ref={c=>{
          this.form=c;
      }}
      

      >
        
          <div >
          <button type="button" class="btn btn-danger" id="bouttonCroix" >X</button><br></br>
              <label className="col-4 col-form-label" for ="profile-email">Usernamae</label>
              <Input
              className="form-control"
              value={this.state.currentUser.username}
              onChange={this.onChangeUsername}
              />
          </div>

          <div >
              <label className="col-4 col-form-label" for ="profile-email">Description</label>
              <Input
              className="form-control"
              value={this.state.currentUser.description}
              onChange={this.onChangeDescription}
              />
          </div>
          
    <button id="modifChange" className="btn btn-primary">Changer ses modifs</button>

      </Form>

   
      </div>
        </Modal>

        
        <Modal open={this.state.openModalFriend} onClose={this.onCloseModalFriend}>
        <div>
            
            <h1>Utilisateur de l'application</h1>
                <div class="input-group rounded">
                    <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search"
                    aria-describedby="search-addon" />
                        <span class="input-group-text border-0" id="search-addon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                            </svg>
                        </span>
                </div>
          <ul class="list-group">
            {users.map((user) => (
              <li class="list-group-item" key={user.id}>
                {user.firstName} {user.lastName}

                <a href={"/user/" + user.id} onClick={this.getOneUser}><button id="seeProfil" type="button" class="btn btn-secondary">Voir profil</button>
                
                </a>
              </li>
            ))}
          </ul>
        </div>


        </Modal>
        
      </div>
    );
  }
}
