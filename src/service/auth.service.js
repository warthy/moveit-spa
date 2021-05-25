import axios from "axios";

const API_URL = "http://localhost:8080/s/";

class AuthService {

    login(username, password){
        return axios
        .post(API_URL + "login", {
            username,
            password
        })
        .then(response =>{
            if(response.data.token){
                console.log("yo");
                localStorage.setItem('user', JSON.stringify(response));
            }
            
            return response;
        });
    }

    logout(){
        localStorage.removeItem("user");
    }

    register(username, lastName, firstName, email, password){
        return axios.post(API_URL + "register",{
            username,
                lastName,
                firstName,
                email,
                password,
        });
    }

    getCurrentUser(){
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default new AuthService();