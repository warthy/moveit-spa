import React, {Component} from 'react'
import axios from "axios";
import './ActivityId.css'
import Header from "./Header.js";


const user = JSON.parse(localStorage.getItem('user'));
export default class ActivityId extends Component {
    constructor(props) {
        super(props);

        this.state={
            activity:[],
            username:"",
            participants:[]
        };
    }

    componentDidMount() {
        this.getActivity();
    }

    async getActivity() {
        const response =axios.get("http://localhost:8080/activity/"+this.props.match.params.id,{headers:{
            Authorization: `Bearer  ${user}`,
                  'Content-Type': 'application/json;charset=UTF-8',
                  'Access-Control-Allow-Origin' : '*',
                  'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        },
    })

    const {data}= await response;
    this.setState({activity: data})
    this.setState({
        username:this.state.activity.author.username
    })
    this.setState({
        participants:this.state.activity.participants
    })
    console.log(this.state.participants)
  
 
  

    }
  
  

    render() {
        const {activity, username, participants}=this.state;
        let Nombresparticipants;
        if(participants.length===0){
            Nombresparticipants="Pas de particpants"
        } else{
        Nombresparticipants=
        <ul>
                {participants.map(participant=>(
                    <li clasx="list-group" key={participant.id}>{participant.username}</li>
                ))}
            </ul>
      
        
        
           
    }
    let location;  
    if(activity.location==="Nancy"){
        location =
        <div  id="map-container-google-2" class="z-depth-1-half map-container" >
        <iframe src="https://maps.google.com/maps?q=nancy&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0"
          allowfullscreen></iframe>
          </div>
    }else if(activity.location==="Champigneulles"){
        location = 
        <div  id="map-container-google-2" class="z-depth-1-half map-container" >
        <iframe src="https://maps.google.com/maps?q=champigneulles&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0"
          allowfullscreen></iframe>
        </div>
    }else {
        location  = 
        <div  id="map-container-google-2" class="z-depth-1-half map-container" >
        <iframe src="https://maps.google.com/maps?q=paris&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0"
          allowfullscreen></iframe>
      </div>
    }

    
    return (
        <div>
             <Header />
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th className="col">Champ</th>
                        <th className="col">Valeur</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <th scope="row">Author</th>
                        <td>{username}</td>
                    </tr>

                    <tr>
                        <th scope="row">Name</th>
                        <td>{activity.name}</td>
                    </tr>

                    <tr>
                        <th scope="row">Lieu</th>
                        <td>{activity.location}</td>
                    </tr>

                    <tr>
                        <th scope="row">Date</th>
                        <td>{activity.start}</td>
                    </tr>

                    <tr>
                        <th scope="row">Description</th>
                        <td>{activity.description}</td>
                    </tr>
                    <tr>
                    <th scope="row">Participant(s)</th>
                     <td>  {Nombresparticipants}</td>
                    </tr>
                    <tr>
                   
                    </tr>
                

                </tbody>
              
            </table>

            {location}
            

           
        </div>
    )

    }
}
