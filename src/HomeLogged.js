import React, {Component} from 'react'
import axios from "axios";
import './HomeLogged.css';
import croix from './images/croix.png';
import coeur from './images/couer.png';
import message from './images/message.png';
import ActivitiesService from './service/activities.service'
import Header from './Header'


const API_URL = "http://localhost:8080/activity/";
const user = JSON.parse(localStorage.getItem('user'));

export default class HomeLogged extends Component {

    constructor(props) {
        super(props);
        this.getActivity=this.getActivity.bind(this);

        this.state={
            activities:[],
            activity_id:"",
          
          
        };

       
    }

    componentDidMount() {
        this.getAllActivities();
        this.getActivity();
    }

    
    async getAllActivities() {
        const response = axios.get(API_URL ,{headers:{
            Authorization: `Bearer  ${user}`,
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        },
    })

    const {data} = await response;
    this.setState({activities: data})
    
    }

   
    
    async getActivity(){
      const response = axios.get(API_URL+this.props.match.params.id,{headers:{
            Authorization: `Bearer  ${user}`,
                  'Content-Type': 'application/json;charset=UTF-8',
                  'Access-Control-Allow-Origin' : '*',
                  'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        },
    })
      
    const{data}= await response
    localStorage.setItem('activity', JSON.stringify(data.id));
    const activityLocalStorage = JSON.parse(localStorage.getItem('activity'));
      
    this.setState({
        activity_id: activityLocalStorage,
       
    });
     
    ActivitiesService.createParticipant(
        this.state.activity_id
    )
    .then(response=>{
        return response
      
    },
    error=>{
        console.log(error)
    })
}



   
    render(){
      const {activities}=this.state;
    
        return (
            
            <div className="HomeLogged">
                <Header />
                <h1>Trouvez une activités</h1>
                <ul>
                    {activities.map(activity=>(
                        <li class="list-group-item" id="activity" key={activity.name}><div className="labelQuestion"> <p>QUI ?</p> <p>QUOI ?</p> <p>QUAND ?</p> <p>OU ?</p> </div><br />
                            <div className="labelQuestion"><p>{activity.author.username}</p> <p>{activity.name}</p> <p>{activity.start.split('T00:00:00.000+00:00')}</p> <p>{activity.location}</p> </div> <br />
                            <div className="labelQuestion">  <img id="croix" src={croix} alt="croix" class="rounded" /> <button date_id="123"><img id="coeur" src={coeur} alt="coeur" />     </button><img id="message" src={message} alt="message" /> </div>
                            
                            <a href={"/home/"+activity.id}  onClick={this.getActivity}> Activity</a>
                            </li>
                    ))}
                    </ul>
                
         
          

            </div>
        )
    }
}