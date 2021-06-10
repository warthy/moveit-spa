import React, {Component} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import './Modal.css'

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import axios from 'axios';
import ActivitieService from "../service/activities.service";
import AuthService from '../service/auth.service';
import Noty from 'noty';  
import "../../node_modules/noty/lib/noty.css";  
import "../../node_modules/noty/lib/themes/mint.css"; 




const API_URL = "http://localhost:8080/user/";
const user = JSON.parse(localStorage.getItem('user'));

export default class SimpleModal extends Component  {

  constructor(props) {

    super(props);

    this.submitUpdateInformation=this.submitUpdateInformation.bind(this);
    this.onChangeDescription=this.onChangeDescription.bind(this);
    this.onChangeUsername=this.onChangeUsername.bind(this);

    this.state = {
      currentUser:[],
      username:"",
      description:"",
    }
  }
  componentDidMount() {
    this.getCurrentUser();
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
 

  async getCurrentUser() {
    const response = axios.get(API_URL + "me",{ headers:{
      Authorization: `Bearer  ${user}`,
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    },
   }) 
   
const {data} = await response;
this.setState({currentUser: data})
this.setState({
  username:data.username, 
  description:data.description
})

}



      render() {

        return(
      



    <div
    style={{
      opacity: this.props.show ? '1': '0'
    }}
    >

    
      <Form 
      onSubmit={this.submitUpdateInformation}
        ref={c=>{
          this.form=c;
      }}
      

      >
        
          <div >
          <button onClick={this.props.hideModal} >X</button>
              <label className="col-4 col-form-label" for ="profile-email">Usernamae</label>
              <Input
              className="form-control col-8"
              value={this.state.currentUser.username}
              onChange={this.onChangeUsername}
              />
          </div>

          <div >
              <label className="col-4 col-form-label" for ="profile-email">Description</label>
              <Input
              className="form-control col-8"
              value={this.state.currentUser.description}
              onChange={this.onChangeDescription}
              />
          </div>
          
    <button className="btn btn-primary">Changer ses modifs</button>

      </Form>

   
      </div>
   
        )

      }

    }