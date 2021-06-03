import axios from "axios";
const API_URL="http://localhost:8080/";
const user = JSON.parse(localStorage.getItem('user'));

class ActivitieService{

    
    createActivitie(description, location, name, start){
        
        
        return axios({
            method: 'POST',
            url:API_URL + "activity",
            data: { 
            description,
            name,
            location,
            start

        },
        headers:{
            Authorization: `Bearer ${user}`,
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }
    
    })
}

        createParticipant(activity_id){
            alert("yo")
            return axios({
                method: 'POST',
                url:"http://localhost:8080/activity/"+activity_id+"/join",
                data:{
                    activity_id,
                   
                },

                headers:{
                    Authorization: `Bearer ${user}`,
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Access-Control-Allow-Origin' : '*',
                    'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                }
            })
        }








}

export default new ActivitieService();