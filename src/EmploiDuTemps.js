import React, {Component} from 'react';
import axios from 'axios';
import './EmploiDuTemps.css'

const API = "http://localhost:8080/activity";
const user =JSON.parse(localStorage.getItem('user'));
export default class EmploiDuTemps extends Component {

    constructor(props) {
        super(props);

        this.state={
            activities: [],
            currentUser:[]
        };
    }

    componentDidMount() {
        this.getUser();
        this.getActivity();
        
    }

    async getUser(){
        const response = axios.get('http://localhost:8080/user/me',{headers:{
            Authorization: `Bearer  ${user}`,
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        },
    })
    const{data}=await response;
    this.setState({currentUser:data});
    console.log(this.state.currentUser.id)
    console.log(this.state.currentUser)
    }

    async getActivity() {
        const response = axios.get(API,{headers:{
            Authorization: `Bearer  ${user}`,
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        },
    })

    const {data} = await response;
    for(var i=0; i<data.length; i++) {
        for (var j=0; j<data[i].participants; j++) {}
        console.log(data[i].participants[j].id);

        if(data[i].participants[j].id===this.state.currentUser.id){
            this.setState({activities:data[i]})
        }
    }
   
    console.log(this.state.activities);
    }

    render() {
        return (
            <div className="emploi">
                Emploi du temps
            </div>
        )
    }
}