import React, {Component} from 'react'
import './Inscription.css'

import sports from './Sport'
import arts from './Art'
import others from './Other'

import {Link} from 'react-router-dom'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

import { isEmail } from "validator";

import axios from "axios";
import AuthService from "./service/auth.service";

import Noty from 'noty';  
import "../node_modules/noty/lib/noty.css";  
import "../node_modules/noty/lib/themes/mint.css"; 



const user = JSON.parse(localStorage.getItem('user'));

const required = value =>{
    if (!value){
        return (
            <div className="alert alert-danger" role="alert">
              This field is required!
            </div>
          );
        }
      };

      const email = value => {
        if (!isEmail(value)) {
          return (
            <div className="alert alert-danger" role="alert">
              This is not a valid email.
            </div>
          );
        }
      };

     /* const birthdate = value => {
        if (new Date(value) > new Date()) {
          return (
            <div className="alert alert-danger" role="alert">
              You can't born in the future !
            </div>
          );
        }
      };*/

      const vusername = value => {
        if (value.length < 3 || value.length > 20) {
          return (
            <div className="alert alert-danger" role="alert">
              The username must be between 3 and 20 characters.
            </div>
          );
        }
      };
      
      const vpassword = value => {
        if (value.length < 6 || value.length > 40) {
          return (
            <div className="alert alert-danger" role="alert">
              The password must be between 6 and 40 characters.
            </div>
          );
        }
      };


export default class Inscription extends Component {

    constructor(props) {
        super(props);
            this.handleRegister=this.handleRegister.bind(this);
            this.onChangeUsername=this.onChangeUsername.bind(this);
            this.onChangeLastname=this.onChangeLastname.bind(this);
            this.onChangeFirstname=this.onChangeFirstname.bind(this);
            this.onChngeDescription=this.onChangeDescription.bind(this);
            this.onChangeBirthdate=this.onChangeBirthdate.bind(this);
            this.onChangeEmail = this.onChangeEmail.bind(this);
            this.onChangeEmailConfirmation = this.onChangeEmailConfirmation.bind(this);
            this.onChangePassword = this.onChangePassword.bind(this);
            this.onChangePasswordConfirmation = this.onChangePasswordConfirmation.bind(this);
            this.onChangeSports = this.onChangeSports.bind(this);
            this.onChangeArts=this.onChangeArts.bind(this);
            this.onChangeOthers=this.onChangeOthers.bind(this);

            this.state={
             incidents:[],
              interest:[],
                username:"",
                lastName:"",
                firstName:"",
                description:"",
                email:"",
                password:"",
               
                today:new Date().toISOString().split("T")[0],
                
                emailConfirmation:"",
                
                passwordConfirmation:"",
                sports:"",
                arts:"",
                others:"",
                sports2:"",
                arts2:"",
                others2:"",
                interests:[],
                successful:false,
                message:""
            };
        }

         componentDidMount(){
         this.getMap();
          this.getAllInterests();
        }

        async getAllInterests(){
          const response = axios.get("http://localhost:8080/interest")

          const {data} = await response;
          this.setState({interest:data})
            console.log(this.state.interest)
          
        }

        async getMap() {
          const res = await axios.get('https://data.sfgov.org/resource/wr8u-xric.json', {
            params:{
              "$limit":500,
              "$$app_token":
              "aWiWtw4ujnJ3kwi5bBAIQXJXd"


            }
          })
          const incidents =  res.data;
          this.setState({incidents: incidents})
        }

    
        

        onChangeUsername(e) {
            this.setState({
              username: e.target.value
            });
          }

          onChangeLastname(e){
              this.setState({
                  lastName: e.target.value
              });
          }

          onChangeFirstname(e){
              this.setState({
                  firstName: e.target.value
              });
          }

          onChangeDescription=(e)=>{
            this.setState({
              description: e.target.value
            });
          }

          onChangeBirthdate(e){
            this.setState({
                birthdate: e.target.value
            });
        }

          onChangeEmail(e) {
            this.setState({
              email: e.target.value
            });
          }

          onChangeEmailConfirmation(e) {
            this.setState({
              emailConfirmation: e.target.value
            });
          }

          onChangePassword(e) {
            this.setState({
              password: e.target.value
            });
          }

          onChangePasswordConfirmation(e) {
            this.setState({
              passwordConfirmation: e.target.value
            });
          }

          onChangeSports(e) {
         
            this.setState({
              sports: e.target.value
            });
              
           
           
          }

          onChangeArts(e) {
            this.setState({
              arts: e.target.value
            });
          }

          onChangeOthers(e){

         



            this.setState({
              others: e.target.value
            });

           

           
          }

         






          handleRegister(e){
          for(var i = 0; i<this.state.interest.length; i++){
           if(this.state.interest[i].name === this.state.sports){
         
             this.state.interests.push(this.state.interest[i].id)
           }
          }

          for(var j = 0; j<this.state.interest.length; j++){
            if(this.state.interest[j].name === this.state.others){
              console.log(this.state.interest[j].id)
             
              this.state.interests.push(this.state.interest[j].id)
            }
           }

           for(var k = 0; k<this.state.interest.length; k++){
            if(this.state.interest[k].name === this.state.arts){
             
             
              this.state.interests.push(this.state.interest[k].id)
            }
           }

         


       
           console.log(this.state.interests)


         
          
            
           
              e.preventDefault();

              this.setState({
                  message:"",
                  successful:false
              });

              this.form.validateAll();
              console.log(this.form.validateAll());
            

           
                  AuthService.register(
                      this.state.username, 
                      this.state.lastName,
                      this.state.firstName,
                      this.state.description,
                      this.state.email,
                      this.state.password,
                      this.state.interests,
                   
                     
                      
                      this.state.emailConfirmation,
                    
                      this.state.passwordConfirmation
                  ).then(
                      response => {
                          this.setState({
                              message: response.data.message,
                              successful:true
                          });

                          new Noty({
                            type:"success",
                            layout:"centerRight",
                            text:"Votre compte a bien été créé",
                            timeout:3000
                        }).show();
                      },
                      error => {
                          const resMessage=
                          (error.response &&
                            error.response.data &&
                            error.response.data.message) || 
                            error.message || 
                            error.toString();

                            this.setState({
                                successful:false,
                                message:resMessage
                            });

                            new Noty({
                              type:"danger",
                              layout:"centerRight",
                              text:"Veuillez remplir tous les champs",
                              timeout:3000
                          }).show();
                      }
                  );

                 
              
          }
        


    

  
    



    render(){
    
    return(
        <div className="Inscription">
              <Link to="/">
              <svg id="fleche" xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-arrow-90deg-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1.146 4.854a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H12.5A2.5 2.5 0 0 1 15 6.5v8a.5.5 0 0 1-1 0v-8A1.5 1.5 0 0 0 12.5 5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4z"/>
</svg>

            </Link>
        <h1>Inscrivez-vous</h1>

        <Form 
        onSubmit={this.handleRegister}
        ref={c=>{
            this.form=c;
        }}
        
        >

     
               <div >
                   <div class="form-row" className="test">
                   <div class="form-group col-md-4">
                       <label htmlFor="username">Username</label>
                       <Input
                       type="text"
                       name="username"
                       class="form-control"
                       value={this.state.username}
                       onChange={this.onChangeUsername}
                       required

                       />
                   </div>

                   <div class="form-group col-md-4">
                  <label htmlFor="lastname">Lastname</label>
                  <Input
                    type="text"
                    class="form-control"
                    name="lastname"
                    value={this.state.lastName}
                    onChange={this.onChangeLastname}
                    required
                  />
                </div>
                </div>

                <div class="form-row" className="test">
                <div class="form-group col-md-4">
                  <label htmlFor="firstname">Firstname</label>
                  <Input
                    type="text"
                    class="form-control"
                    name="firstname"
                    value={this.state.firstName}
                    onChange={this.onChangeFirstname}
                    required
                  />
                </div>

                <div class="form-group col-md-4">
                  <label htmlFor="birthdate">Birthdate</label>
                  <Input
                    type="date"
                    className="form-control"
                    name="birthdate"
                    value={this.state.birthdate}
                    max={this.state.today}
                   
                  />
                </div>

               
                </div>

                <div class="form-row" className="test">

                <div class="form-group col-md-4">
                  <label htmlFor="email">Email</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    required
                  />
                </div>
               

              

                <div class="form-group col-md-4">
                  <label htmlFor="Confirmemail">Confimer le mail</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="emailConfirmation"
                    value={this.state.emailConfirmation}
                    onChange={this.onChangeEmailConfirmation}
                    required
                  />
                </div>
               

               
                </div>


                <div class="form-row" className="test">

                <div class="form-group col-md-4">
                  <label htmlFor="password">Mot de passe</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    required
                  />
                </div>

                <div class="form-group col-md-4">
                  <label htmlFor="password">Confimer mot de passe</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={this.state.passwordConfirmation}
                    onChange={this.onChangePasswordConfirmation}
                    required
                  />
                </div>
                

               

                </div>
                <h2>Centres d'intêrets</h2>

                <div class="form-row">
                <div class="form-group col-md-4">
                <label for="sportAct">Sport activités</label>
                <select
                name="sports"
                class="form-control"
                value={this.state.sports}
                onChange={this.onChangeSports}
                >
                    <option key=""></option>
                    {sports.map(sport=>(
                        <option key={sport}>{sport}</option>
                    ))}
                </select>
              

                </div>

                <div class="form-group col-md-4">
                <label for="otherAct">Autres activités</label>
                <select
                name="others"
                class="form-control"
                value={this.state.others}
                onChange={this.onChangeOthers}
                >
                    <option key=""></option>
                    {others.map(other=>(
                        <option key={other}>{other}</option>
                    ))}
                </select>
              

                </div>

                <div class="form-group col-md-4">
                <label for="artAct">Art activités</label>
                <select
                name="arts"
                class="form-control"
                value={this.state.arts}
                onChange={this.onChangeArts}
                
                >
                    <option key=""></option>
                    {arts.map(art=>(
                        <option key={art}>{art}</option>
                    ))}
                </select>
              

                </div>





                </div>

                <div class="form-group">
                    <label for="description">Description</label>
                    <Input 
                    type = "text"
                   className="form-control"
                   name="description"
                   value={this.state.description}
                   onChange={this.onChangeDescription}
                   
                    
                    />

                    </div>

                <div>
                    <button>S'inscrire</button>
                </div>


               </div>
           

          
     



         
          
          
      </Form>
                  

        </div>
    )
}

}

