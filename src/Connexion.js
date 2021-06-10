import React, {Component} from 'react'
import './Connexion.css'
import Form from "react-validation/build/form";
import cadenas from'./images/cadenas.png'
import user from'./images/user.png'
import fleche from './images/fleche.png'
import {Link} from 'react-router-dom'
import Input from "react-validation/build/input";
import CheckButton from 'react-validation/build/button';

import AuthService from "./service/auth.service";

const required = value =>{
    if(!value){
        return (
            <div >

            this field is required
            </div>
        );
    }
};

export default class Connexion extends Component {

    constructor(props){
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            username: "",
            password:"",
            loading:false,
            message:""
        };
    }

    onChangeUsername(e){
        this.setState({
            username: e.target.value
        });
    }

    onChangePassword(e){
        this.setState({
            password: e.target.value
        });
    }

    handleLogin(e){
        e.preventDefault();

        this.setState({
            message:"",
            loading:true
        });

        this.form.validateAll();

            AuthService.login(this.state.username, this.state.password).then(
                ()=>{
                   this.props.history.push("/home");
                   //window.location.reload();
                },
                error=>{
                    const resMessage = 
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                        error.message ||
                        error.toString();
    
                        this.setState({
                            loading:false,
                            message:  resMessage
                        });
                    }
                );
    
 
    
}

    render() {
    

        return(
            <div className="Connexion">
    
                <Link to="/">
                    <img id="fleche2" src={fleche} alt="fleche"/>
    
                </Link>
            <h1>Connexion</h1>
    
            <Form
            onSubmit={this.handleLogin}
            ref={c=>{
                this.form=c;
            }}
            >
    
    
        <div id="formConnexion"> 

        <div class="form-group row">
        <label for="exampleInputEmail1" class="col-sm-2 col-form-label"><img id="user" src={user} alt="user" /></label>
   
        <div class="col-sm-10">
            <Input
            type="text" 
            class="form-control"
            name="username"
            value={this.state.username}
            onChange={this.onChangeUsername}
            validations={[required]}
            id="exampleInputEmail1"
            placeholder="Mail"
           
           />
           </div>
      
           </div>
    
    
           <div class="form-group row">
            <label for="exampleInputPassword1" class="col-sm-2 col-form-label">  <img id="cadenas" src={cadenas} alt="cadenas"/></label>
            <div class="col-sm-10">
                    <Input
                    type="password" 
                    name="password" 
                    class="form-control"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required]}
                    id="exampleInputPassword1"
                    placeholder="Mot de passe"
                    
                     />
           
            </div>
            </div>
            
            </div>
            <button class="btn btn-primary">
                
                {this.state.loading }
                <span>Se connecter</span>
                </button>
            <div >
            <a  id="mdp" href="/">Mot de passe oublié ?</a>
            </div>

            {this.state.message &&(
                <div>
                    <div>
                        {this.state.message}
                    </div>
                </div>
            )}

 
         
         </Form>
    
            </div>
        );
    }

}



