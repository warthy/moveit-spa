import React, {Component} from 'react';
import './ActivityUser.css'
import axios from "axios";
import croix from './images/croix.png';
import edit from './images/edit.png';
import Header from "./Header.js";

import ActivitiesService from './service/activities.service'

const URL = "http://localhost:8080/user/me";
const API_URL = "http://localhost:8080/activity/";
const user =JSON.parse(localStorage.getItem('user'));
var test =[];
const pages = [];
export default class ActivityUser extends Component {

    constructor(props) {
        super(props);

        this.state={
            currentUser:[],
            activities:[],
            activity_id:"",
            currentPage:1,
            itemsPerPage:2,
            pageNumberLimit:10,
            maxPageNumberLimit:10,
            minPageNumberLimit:0,
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

handleClick =(event) =>{
    this.setState({
        currentPage:Number(event.target.id)
    })
}

 renderPagesNumbers = pages.map((number) =>{
    
    if(number<this.state.maxPageNumberLimit +1 && number > this.state.minPageNumberLimit){
        return (
            <li
            key={number}
            id={number}
            onClick={this.handleClick}
            className={this.state.currentPage ==number ? "active": null}
            >{number}
            </li>
        );
    }else{
        return null;
    }
});

handleNextbtn = ()=>{
    this.setState({
        currentPage:this.state.currentPage+1
});

if((this.state.currentPage+1)% this.state.pageNumberLimit==0){
    this.setState({maxPageNumberLimit: this.state.maxPageNumberLimit+ this.state.pageNumberLimit})
    this.setState({minPageNumberLimit:this.state.minPageNumberLimit+this.state.pageNumberLimit})
}
};

hanldePrevbtn=()=>{
    this.setState({currentPage:this.state.currentPage-1

});
    if((this.state.currentPage-1)% this.state.pageNumberLimit==0){
        this.setState({maxPageNumberLimit: this.state.maxPageNumberLimit- this.state.pageNumberLimit})
        this.setState({minPageNumberLimit:this.state.minPageNumberLimit-this.state.pageNumberLimit})
    }
}

handleLoadMore=()=>{
    this.setState({itemsPerPage: this.state.itemsPerPage+5});
}

renderActivities= (activities)=>{
    return (
        <ul >
        {activities.map(activity=>(
      <li class="list-group-item" id="activity" key={activity.name}><div className="labelQuestion"> <p>QUOI ?</p> <p>QUAND ?</p> <p>OU ?</p> </div><br />
      <div className="labelQuestion"> <p>{activity.name}</p> <p>{activity.start.split('T00:00:00.000+00:00')}</p> <p>{activity.location}</p> </div> <br />
      <div className="labelQuestion"><img id="croix" src={croix} alt="croix" class="rounded" />   <img id="edit" src={edit} alt="edit" />  </div>
      
  
      </li>
        ))}
    </ul>
    )
}

    

    
    render() {

        const {activities, currentPage, itemsPerPage, maxPageNumberLimit,minPageNumberLimit}=this.state;
        for (let i = 1; i <= Math.ceil(activities.length/itemsPerPage); i++){
            pages.push(i);
        }
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = activities.slice(indexOfFirstItem, indexOfLastItem)
  
        let pageIncrementBtn = null;
        if(pages.length>maxPageNumberLimit){
            pageIncrementBtn = <li onClick={this.handleNextbtn}> </li>;
        }
  
        let pageDecrementBtn = null;
        if(minPageNumberLimit >=1){
          pageDecrementBtn = <li onClick={this.hanldePrevbtn}> </li>;
        }
  
        
        return (
            <div className ="ActivityUser">
                <Header />
                
                <h1>Mes activités</h1>
                {this.renderActivities(currentItems)}
         
                <ul className="pageNumbers">
                    <li>
                        <button className="btn btn-primary boutonPagination"
                        onClick={this.hanldePrevbtn}
                        disabled={currentPage==pages[0] ? true: false}
                        ><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                      </svg></button>
                    </li>

                    {pageDecrementBtn}
                    {this.renderPagesNumbers}
                    {pageIncrementBtn}

                    <li>
                        <button className="btn btn-primary boutonPagination"
                        onClick={this.handleNextbtn}
                        disabled={currentPage==pages[pages.length-1] ? true : false}
                        ><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                      </svg></button>
                    </li>

                </ul>
                
            </div>
        )
    }
}