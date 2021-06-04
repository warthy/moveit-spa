import React, {Component} from 'react'
import './Inscription.css'
//import sexes from './Genre'
import sports from './Sport'
import arts from './Art'
import others from './Other'
import fleche from './images/fleche.png'
import {Link} from 'react-router-dom'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "./service/auth.service";


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
            this.onChangeBirthdate=this.onChangeBirthdate.bind(this);
            this.onChangeEmail = this.onChangeEmail.bind(this);
            this.onChangeEmailConfirmation = this.onChangeEmailConfirmation.bind(this);
            this.onChangePassword = this.onChangePassword.bind(this);
            this.onChangePasswordConfirmation = this.onChangePasswordConfirmation.bind(this);

            this.state={
                username:"",
                lastName:"",
                firstName:"",
                email:"",
                password:"",
               
                today:new Date().toISOString().split("T")[0],
                
                emailConfirmation:"",
                
                passwordConfirmation:"",
                successful:false,
                message:""
            };
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

          handleRegister(e){

          
            
           
              e.preventDefault();

              this.setState({
                  message:"",
                  successful:false
              });

              this.form.validateAll();
              console.log(this.form.validateAll());

              if(this.checkBtn.context._errors.length===0){
                  AuthService.register(
                      this.state.username, 
                      this.state.lastName,
                      this.state.firstName,
                      this.state.email,
                      this.state.password,
                     
                      
                      this.state.emailConfirmation,
                    
                      this.state.passwordConfirmation
                  ).then(
                      response => {
                          this.setState({
                              message: response.data.message,
                              successful:true
                          });
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
                      }
                  );
              }
          }
        


    

  
    



    render(){
    return(
        <div className="Inscription">
              <Link to="/">
            <img id="fleche" src={fleche} alt="fleche" />

            </Link>
        <h1>Inscrivez-vous</h1>

        <Form 
        onSubmit={this.handleRegister}
        ref={c=>{
            this.form=c;
        }}
        
        >

           {!this.state.successful && (
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
                       validations={[required, vusername]}

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
                    validations={[required]}
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
                    validations={[required]}
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
                    validations={[required, email]}
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
                    validations={[required, email]}
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
                    validations={[required, vpassword]}
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
                    validations={[required, vpassword]}
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
                    type="text" class="form-control"
                    
                    />

                    </div>

                <div>
                    <button>S'inscrire</button>
                </div>


               </div>
           )}

           {this.state.message && (
               <div>

                    <div className={this.state.successful
                    ?"alert alert-success"
                : "alert alert-danger"
            
            }
            role="alert"
                >
                    {this.state.message}


                </div>

               </div>
           )}
           <CheckButton
           style={{display:"none"}}
           ref={c=>{
               this.checkBtn=c;
           }}

           />



         
            <a href="/">Mot de passe oublié ?</a>
          
      </Form>

        </div>
    )
}

}

