import React, {Component} from 'react';
import './ActivityUser.css'
import axios from "axios";
import croix from './images/croix.png';
import edit from './images/edit.png';

import ActivitiesService from './service/activities.service'

const URL = "http://localhost:8080/user/me";
const API_URL = "http://localhost:8080/activity/";
const user =JSON.parse(localStorage.getItem('user'));
var test =[];
export default class ActivityUser extends Component {

    constructor(props) {
        super(props);

        this.state={
            currentUser:[],
            activities:[],
            activity_id:"",
        };
    }

    componentDidMount() {
        this.getUser();
        this.getActivity();
        this.getOneActivity();
    }

    async getUser() {

        const response = axios.get(URL , {headers:{
            Authorization: `Bearer  ${user}`,
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          },
         }) 

         const {data} = await response;
         this.setState({
             currentUser:data
         })

    }

    async getOneActivity(){
    
        const response = axios.get(API_URL+3,{headers:{
            Authorization: `Bearer  ${user}`,
                  'Content-Type': 'application/json;charset=UTF-8',
                  'Access-Control-Allow-Origin' : '*',
                  'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        },
    })
    alert("tyo");
    const {data} = await response
  
    localStorage.setItem('activity',JSON.stringify(data.id));
    const activityLocalStorage = JSON.parse(localStorage.getItem('activity'));

    this.setState({
        activity_id: activityLocalStorage,
    });

    console.log(this.state.activity_id)

    ActivitiesService.deleteActivity(
        this.state.activity_id
    )
    .then(response =>{
        return response
    },
    error =>{
        console.log(error)
    }
    )


    }



    async getActivity(){

        const response = axios.get(API_URL ,{headers:{
            Authorization: `Bearer  ${user}`,
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        },
    })



    const {data} = await response;

    for(var i = 0; i<data.length; i++){

     if(this.state.currentUser.id === data[i].author.id){
         console.log(this.state.currentUser.id)
         console.log(data[i])
         test.push(data[i])
            this.setState({activities: test})
             console.log(this.state.activities)
    

     }
    }

}

    

    
    render() {

        const {activities} =this.state;
        return (
            <div className ="ActivityUser">
                <h1>Mes activités</h1>

                <ul >
            {activities.map(activity=>(
          <li class="list-group-item" id="activity" key={activity.name}><div className="labelQuestion"> <p>QUOI ?</p> <p>QUAND ?</p> <p>OU ?</p> </div><br />
          <div className="labelQuestion"> <p>{activity.name}</p> <p>{activity.start.split('T00:00:00.000+00:00')}</p> <p>{activity.location}</p> </div> <br />
          <div className="labelQuestion"><img id="croix" src={croix} alt="croix" class="rounded" />   <img id="edit" src={edit} alt="edit" />  </div>
          
          <a href={"/activityUser/"+activity.id} onClick={this.getOneActivity}>tty</a>
          </li>
            ))}
        </ul>

                
            </div>
        )
    }
}