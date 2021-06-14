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
const pages=[];
let modalStyle;
export default class Profil extends Component {
  constructor(props) {
    super(props);

    this.submitUpdateInformation=this.submitUpdateInformation.bind(this);
    this.onChangeDescription=this.onChangeDescription.bind(this);
    this.onChangeUsername=this.onChangeUsername.bind(this);
    

    this.state = {
      interestUser:[],
      showMatch:false,
      matching:[],
      currentUser: [],
      friends:[],
      users: [],
      show: false,
      openModalFriend: false,
      openModalEdit:false,
      openModalMyFriend:false,
      username:"",
      description:"",
      currentPage:1,
      itemsPerPage:3,
      pageNumberLimit:10,
      maxPageNumberLimit:10,
      minPageNumberLimit:0,
      listUser:[3,10],
      minimumDuration:1000,
      from:"2021-06-06",
      to:"2021-10-06"
      
      
    };
  }
  componentDidMount() {
    this.getData();
    this.getAllUser();
    this.getFriends();
    this.matchtemps();
    this.getInterest();
  }


  

  matchtemps(){
    AuthService.mathEmploiDutemps(
      this.state.listUser,
      this.state.minimumDuration,
      this.state.from,
      this.state.to
    )
    .then(
      response =>{
        console.log(response.data)
        this.setState({
          matching: response.data
        })
        console.log(this.state.matching)
      },
      error=>{
        console.log(error)
      }
  
    )
   
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

  handleClick =(event) =>{
    this.setState({
        currentPage:Number(event.target.id)
    })
}

 renderPagesNumbers = pages.map((number) =>{
    
    if(number<this.state.maxPageNumberLimit +1 && number > this.state.minPageNumberLimit){
        return (
            <li
            key={number}
            id={number}
            onClick={this.handleClick}
            className={this.state.currentPage ==number ? "active": null}
            >{number}
            </li>
        );
    }else{
        return null;
    }
});


  handleNextbtn = ()=>{
    this.setState({
        currentPage:this.state.currentPage+1
});

if((this.state.currentPage+1)% this.state.pageNumberLimit==0){
    this.setState({maxPageNumberLimit: this.state.maxPageNumberLimit+ this.state.pageNumberLimit})
    this.setState({minPageNumberLimit:this.state.minPageNumberLimit+this.state.pageNumberLimit})
}
};

hanldePrevbtn=()=>{
    this.setState({currentPage:this.state.currentPage-1

});
    if((this.state.currentPage-1)% this.state.pageNumberLimit==0){
        this.setState({maxPageNumberLimit: this.state.maxPageNumberLimit- this.state.pageNumberLimit})
        this.setState({minPageNumberLimit:this.state.minPageNumberLimit-this.state.pageNumberLimit})
    }
}

handleLoadMore=()=>{
    this.setState({itemsPerPage: this.state.itemsPerPage+5});
}

renderUser=(users)=>{
  return (
    <ul class="list-group">
            {users.map((user) => (
              <li class="list-group-item" key={user.id}>
                {user.firstName} {user.lastName}

                <a href={"/user/" + user.id} onClick={this.getOneUser}><button id="seeProfil" type="button" class="btn btn-secondary">Voir profil</button>
                
                </a>
              </li>
            ))}
          </ul>
  )
}
showModalMyFriends=(e)=>{
  e.preventDefault();
  this.setState({
    openModalMyFriend: true,
  });
};

onCloseModalMyFriend=()=>{
  this.setState({
    openModalMyFriend: false
  })
}


 
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

  match=(e)=>{
    e.preventDefault();
    this.setState({
      showMatch:true
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

  async getFriends(){
    
    const response = axios.get("http://localhost:8080/user/friend",{headers:{
      Authorization: `Bearer  ${user}`,
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    },
  })
  const {data} = await response;
  this.setState({friends: data});
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

  async getInterest() {
    const response = axios.get("http://localhost:8080/interest/me",{headers:{
      Authorization: `Bearer  ${user}`,
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin":"*",
      "Access-Control-Allow-Methods":"GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
  });

  const {data} = await response;
  this.setState({
    interestUser:data
  })

  console.log(data)


  }


  
  




  render() {
    console.log(this.state.interestUser)
    const { users,currentPage, itemsPerPage, maxPageNumberLimit,minPageNumberLimit } = this.state;
    let test;
   
    for (let i = 1; i <= Math.ceil(users.length/itemsPerPage); i++){
        pages.push(i);
    }
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = users.slice(indexOfFirstItem, indexOfLastItem)

    let pageIncrementBtn = null;
    if(pages.length>maxPageNumberLimit){
        pageIncrementBtn = <li onClick={this.handleNextbtn}> </li>;
    }

    let pageDecrementBtn = null;
    if(minPageNumberLimit >=1){
      pageDecrementBtn = <li onClick={this.hanldePrevbtn}> </li>;
    }

    let displayResult;
    if(this.state.showMatch===true){
        displayResult=   this.state.matching
    }
 

    return (
      <div style={{ zIndex: 1 }} className="Profil">
        <Header />

        <div id="Partit_haute">
        <div className="iconPerson">
        <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" fill="black"
                   className="bi bi-person-fill" viewBox="0 0 16 16">
                  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
              </svg>
          </div>

          <div>
            <h2 className="infoPersonn">
              {" "}
              {this.state.currentUser.firstName}{" "}
              {this.state.currentUser.lastName}{" "}
            </h2>
          </div>

          <div>
         

            <p className="infoPersonn">{this.state.currentUser.email}</p>

           
          </div>
        </div>

        <div className="d-flex flex-column">
        <div className="p-2" id="secondInfoProfil">
        <p className="centresInteret">
        <h5 className="centresInteretTitle">Centres d'intérêt : </h5>

          <br></br>
        <p className="description">
              <ul id="interestUser">
                {this.state.interestUser.map((interest)=>{
                  return <li  key={interest.name}>{interest.name},</li>
                })}
              </ul>
              </p>
           
          </p>
        </div>

        <div className="p-2" id="troisiemeInfoProfil">
          <h5 className="descriptionTitle">Description</h5>
          <br></br>
          <br></br>
          {test}
          <p className="description">
            {this.state.currentUser.description}
          </p>
        </div>
        </div>

        <div id="buttonProfil">  
     

       

     <div id="buttonProfil">
     <button type="button" class="btn btn-dark" href="/activityUser">  <a id="seeActivitie" href="/activityUser">Voir mes activités</a></button> 
        <button className="test"type="button" class="btn btn-dark" onClick={this.showModalAmis}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-plus-fill" viewBox="0 0 16 16">
  <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
  <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
</svg>  Ajouter des amis</button>

     <div id="buttonProfil">
        <button className="test" type="button" class="btn btn-dark" onClick={this.showModalMyFriends}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-plus-fill" viewBox="0 0 16 16">
  <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
  <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
</svg>  Voir ses amis</button>

<button className="test" type="button" class="btn btn-warning" onClick={this.showModalEdit}>
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




       
        <button className="test" id="matchEmploiDutemps" onClick={this.match} class="btn btn-dark">Matcher les emploi du temps qui sont dans la bdd</button>
        <div id="reusltatMatchig">
        {displayResult}
      </div>

        <Modal open={this.state.openModalEdit} onClose={this.onCloseModalEdit} >
        <div>

    
      <Form id="modalEdit"
      onSubmit={this.submitUpdateInformation}
        ref={c=>{
          this.form=c;
      }}
      

      >
        
          <div >
      
              <label className="col-8 col-form-label" for ="profile-email">Usernamae</label>
              <Input
              className="form-control"
              value={this.state.currentUser.username}
              onChange={this.onChangeUsername}
              />
          </div>

          <div >
              <label className="col-8 col-form-label" for ="profile-email">Description</label>
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

     


                {this.renderUser(currentItems)}
                <ul className="pageNumbers">
                    <li>
                        <button className="btn btn-primary boutonPagination"
                        onClick={this.hanldePrevbtn}
                        disabled={currentPage==pages[0] ? true: false}
                        ><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                      </svg></button>
                    </li>

                    {pageDecrementBtn}
                    {this.renderPagesNumbers}
                    {pageIncrementBtn}

                    <li>
                        <button className="btn btn-primary boutonPagination"
                        onClick={this.handleNextbtn}
                        disabled={currentPage==pages[pages.length-1] ? true : false}
                        ><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                      </svg></button>
                    </li>

                </ul>
       
        </div>


        </Modal>

        
        <Modal open={this.state.openModalMyFriend} onClose={this.onCloseModalMyFriend}>
        <div>
        <h1>Les utilsateurs avec lequel tu es amis</h1> 
        <ul class="list-group">
        {this.state.friends.map((friend)=>(
          <li class="list-group-item" key={friend.id}>{friend.username}</li>
        ))}

      </ul>
          </div>


        </Modal>
        
      </div>
      </div>
      </div>
    );
  }
}
