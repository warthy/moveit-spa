import axios from "axios";

const API_URL = "http://localhost:8080/s/";
const API_URL2 = "http://localhost:8080/user/";
const user = JSON.parse(localStorage.getItem('user'));

class AuthService {

    login(username, password){
        return axios
        .post(API_URL + "login", {
            username,
            password
        })
        .then(response =>{
            if(response.data.token){
                
                localStorage.setItem('user', JSON.stringify(response.data.token));
            }
            
            return response.data.token;
        });
    }

    logout(){
        localStorage.removeItem("user");
    }
    

    register(username, lastName, firstName, description, email, password,){
        return axios.post(API_URL + "register",{
                username,
                lastName,
                firstName,
                description,
                email,
                password,

        });
    }

    getCurrentUser(){
        
  
        const user = JSON.parse(localStorage.getItem('user'));
        
        
        
        return axios.get(API_URL2 + "me",{ headers:{
            Authorization: `Bearer  ${user}`,
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          },
         })   
            
        
         
         .then(( data ) => {
             return data;
            
         })
         .catch(( err ) => {
            
             console.log( err );
         })
       
    }

    editUser(username, description){
        return axios({
            method: 'POST',
            url: "http://localhost:8080/user/edit",
            data:{
               username,
               description
            },

            headers:{
                Authorization: `Bearer  ${user}`,
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            }
        })
    }
}

export default new AuthService();