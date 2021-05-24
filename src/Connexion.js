import React, {Component} from 'react'
import './Connexion.css'
import Form from "react-validation/build/form";
import cadenas from'./cadenas.png'
import user from'./user.png'
import fleche from './fleche.png'
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

        if(this.checkBtn.context._errors.length===0){
            AuthService.login(this.state.username, this.state.password).then(
                ()=>{
                    this.props.history.push("/profil");
                    window.location.reload();
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
    }else{
        this.setState({
            loading:false
        });
    }
}

    render() {
    

        return(
            <div className="Connexion">
    
                <Link to="/">
                    <img id="fleche2" src={fleche} />
    
                </Link>
            <h1>Connexion</h1>
    
            <Form
            onSubmit={this.handleLogin}
            ref={c=>{
                this.form=c;
            }}
            >
    
    
        <div id="formConnexion"> 
            <label for="email">  <img id="user" src={user}/>
            <Input
            type="text" 
            name="username"
            value={this.state.username}
            onChange={this.onChangeUsername}
            validations={[required]}
            id="email"
            placeholder="Mail"
           
           /></label>
    
    
          
            <label for="paswword">  <img id="cadenas" src={cadenas}/>
                    <Input
                    type="password" 
                    name="password" 
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required]}
                    id="password"
                    placeholder="Mot de passe"
                    
                     />
            </label>
            
            </div>
            <button>
                
                {this.state.loading }
                <span>Se connecter</span>
                </button>
            <div >
            <a  id="mdp" href="#">Mot de passe oublié ?</a>
            </div>

            {this.state.message &&(
                <div>
                    <div>
                        {this.state.message}
                    </div>
                </div>
            )}

            <CheckButton
            style={{dispaly:"none"}}
            ref={c=>{
                this.checkBtn=c;
            }}
    
           />
         </Form>
    
            </div>
        );
    }

}



