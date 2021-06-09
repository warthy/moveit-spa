import React, {Component, useState} from 'react';
import axios from 'axios';
import './EmploiDuTemps.css'
import Calendar from 'react-calendar';
import Header from './Header'

const API = "http://localhost:8080/activity";
const user =JSON.parse(localStorage.getItem('user'));
var test=[];
var allDate=[];



export default class EmploiDuTemps extends Component {



    constructor(props) {
        super(props);
        

        this.state={
            activities: [],
            currentUser:[],
            date: new Date(),
            dateActivity:"",
            displayActivity:false
        };

       
        
    }

    onChange = date=>{
        this.setState({
            date
        })
        console.log(this.state.date.toLocaleDateString())
       console.log(this.state.dateActivity)

       for( var k=0; k<this.state.activities.length;k++){
            if(this.state.date.toLocaleDateString() == this.state.dateActivity[k]){
                this.setState({displayActivity:true})
                console.log(this.state.displayActivity)
                alert("yo")
        }else if(this.state.date.toLocaleDateString() != this.state.dateActivity[k]){
            this.setState({displayActivity:false})
        }

    }

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
     for(var j=0; j<data[i].participants.length; j++) {
  

         if(data[i].participants[j].id==this.state.currentUser.id){
           
            console.log(data[i])
            test.push(data[i])
            this.setState({activities: test})
            var date1 =data[i].start;
            var date5 = date1.toLocaleString()
            var date2=date5.substring(10,8)
            var date3=date5.substring(7,5)
            var date4=date5.substring(0,4)
            var date6 = date2+'/'+date3+'/'+date4
            allDate.push(date6)
            this.setState({dateActivity: allDate})
            console.log(this.state.dateActivity)
           
      
      
         }
    
     
        
   
     }
    
   
     
        
    
        
        
    }

    console.log(this.state.activities);

   
   
   
    }

    render() {
        const {activities}=this.state
        let test;

        if(this.state.displayActivity==true){
            test=   <ul >
            {activities.map(activity=>(
            <li key={activity.id}>{activity.name} le {activity.start.split('T00:00:00.000+00:00')} <hr></hr>  </li>
            ))}
        </ul>

        }else{
            test=<p>Vous avez rien de prévu</p>
        }
        return (
            <div className="emploi">
                     <Header />

                     <h1>Emploi du temps</h1>

                <div id="inner">
                    <div id="panel1">
                        <Calendar 
                           onChange={this.onChange}
                       />
                         
                      
                    </div>
                    <div id="panel2">
                        <div id="header">
                        <h2>Mon agenda</h2>
                        <p> {this.state.date.toLocaleString()}</p>
                        
                        </div>
                        <hr />
                     

                        {test}
                    </div>

                </div>
              
           
            </div>
        )
    }
}