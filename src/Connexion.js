import React, {Component} from 'react'
import './Connexion.css'
import Form from "react-validation/build/form";

import {Link} from 'react-router-dom'
import Input from "react-validation/build/input";

import Noty from 'noty';  
import "../node_modules/noty/lib/noty.css";  
import "../node_modules/noty/lib/themes/mint.css"; 

import AuthService from "./service/auth.service";



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

                        new Noty({
                            type:"error",
                            layout:"centerRight",
                            text:"username ou mot de passe incorrect",
                            timeout:3000
                        }).show();
                    }
                );
    
    
}

    render() {
    

        return(
            <div className="Connexion">
    
    <Link to="/">
              <svg id="fleche2" xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-arrow-90deg-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1.146 4.854a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H12.5A2.5 2.5 0 0 1 15 6.5v8a.5.5 0 0 1-1 0v-8A1.5 1.5 0 0 0 12.5 5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4z"/>
</svg>

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
        <label for="exampleInputEmail1" class="col-sm-2 col-form-label"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
</svg></label>
   
        <div class="col-sm-10">
            <Input
            type="text" 
            class="form-control"
            name="username"
            value={this.state.username}
            onChange={this.onChangeUsername}
           
            id="exampleInputEmail1"
            placeholder="Mail"
           required
           />
           </div>
      
           </div>
    
    
           <div class="form-group row">
            <label for="exampleInputPassword1" class="col-sm-2 col-form-label"> <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-door-closed" viewBox="0 0 16 16">
  <path d="M3 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V2zm1 13h8V2H4v13z"/>
  <path d="M9 9a1 1 0 1 0 2 0 1 1 0 0 0-2 0z"/>
</svg></label>
            <div class="col-sm-10">
                    <Input
                    type="password" 
                    name="password" 
                    class="form-control"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                  
                    id="exampleInputPassword1"
                    placeholder="Mot de passe"
                    required
                     />
           
            </div>
            </div>
            
            </div>
            <button class="btn btn-primary">
                
                {this.state.loading }
                <span>Se connecter</span>
                </button>
            <div >
       
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



