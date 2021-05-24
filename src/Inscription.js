import React, {Component} from 'react'
import './Inscription.css'
import sexes from './Genre'
import sports from './Sport'
import arts from './Art'
import others from './Other'
import fleche from './fleche.png'
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
            this.onChangeEmail = this.onChangeEmail.bind(this);
            this.onChangePassword = this.onChangePassword.bind(this);

            this.state={
                username:"",
                lastName:"",
                firstName:"",
                email:"",
                password:"",
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
        
          onChangeEmail(e) {
            this.setState({
              email: e.target.value
            });
          }
        
          onChangePassword(e) {
            this.setState({
              password: e.target.value
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
                      this.state.password
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
            <img id="fleche" src={fleche} />

            </Link>
        <h1>Inscrivez-vous</h1>

        <Form 
        onSubmit={this.handleRegister}
        ref={c=>{
            this.form=c;
        }}
        
        >

           {!this.state.successful && (
               <div>
                   <div>
                       <label htmlFor="username">Username</label>
                       <Input
                       type="text"
                       name="username"
                       value={this.state.username}
                       onChange={this.onChangeUsername}
                       validations={[required]}

                       />
                   </div>

                   <div >
                  <label htmlFor="lastname">Lastname</label>
                  <Input
                    type="text"
                  
                    name="lastname"
                    value={this.state.lastName}
                    onChange={this.onChangeLastname}
                    validations={[required]}
                  />
                </div>

                <div >
                  <label htmlFor="firstname">Firstname</label>
                  <Input
                    type="text"
                    
                    name="firstname"
                    value={this.state.firstName}
                    onChange={this.onChangeFirstname}
                    validations={[required]}
                  />
                </div>

                   <div >
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

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required, vpassword]}
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



         
            <a href="#">Mot de passe oublié ?</a>
          
      </Form>

        </div>
    )
}

}

