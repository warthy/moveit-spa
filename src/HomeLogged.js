import React, {Component} from 'react'
import axios from "axios";
import './HomeLogged.css';
import croix from './images/croix.png';
import coeur from './images/couer.png';
import message from './images/message.png';
import ActivitiesService from './service/activities.service'
import Header from './Header'
import Noty from 'noty';  
import "../node_modules/noty/lib/noty.css";  
import "../node_modules/noty/lib/themes/mint.css"; 


const API_URL = "http://localhost:8080/activity/";
const user = JSON.parse(localStorage.getItem('user'));
var test=[];
const pages=[];
export default class HomeLogged extends Component {

    constructor(props) {
        super(props);
      

        this.state={
            activities:[],
            currentUser:[],
            activity_id:"",
            currentPage:1,
            itemsPerPage:2,
            pageNumberLimit:10,
            maxPageNumberLimit:10,
            minPageNumberLimit:0,
          
          
        };

       
    }

    componentDidMount() {
        this.getCurrentUser();
        this.getAllActivities();
        this.getActivity();
        
      
    }

    async getCurrentUser() {
     
        const response = axios.get("http://localhost:8080/user/me", {headers:{
            Authorization: `Bearer  ${user}`,
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        },
    })

    const  {data} = await response;
    this.setState({
        currentUser:data
    });
    }

    async getActivity(){
     

        const response = axios.get(API_URL+this.props.match.params.id,{headers:{
            Authorization: `Bearer  ${user}`,
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        },
        
    })

    const {data} =await response
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

    new Noty({
        type:"success",
        layout:"centerRight",
        text:"Vous avez été ajouté à cet évènement",
        timeout:3000
    }).show();


}

    
    async getAllActivities() {
        const response = axios.get("http://localhost:8080/activity" ,{headers:{
            Authorization: `Bearer  ${user}`,
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        },
    })

    const {data} = await response;
    
    
    for (var i=0; i<data.length; i++){
        if(this.state.currentUser.id !== data[i].author.id){
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

    renderActivities = (activities)=>{
        return(
            <ul>
                {activities.map((activitie, index)=>{
                    return <li class="list-group-item" key={index}><div className="labelQuestion"> <p>QUI ?</p> <p>QUOI ?</p> <p>QUAND ?</p> <p>OU ?</p> </div><br />
                    <div className="labelQuestion"><p>{activitie.author.username}</p> <p>{activitie.name}</p> <p>{activitie.start.split('T00:00:00.000+00:00')}</p> <p>{activitie.location}</p> </div> <br />
                    <div className="labelQuestion">  <img id="croix" src={croix} alt="croix" class="rounded" />    <a href={"/home/"+activitie.id}  onClick={this.getActivity}> <img id="coeur" src={coeur} alt="coeur" /></a> <a className="lien" href={"/activity/"+activitie.id} > <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
</svg> </a> </div>
                    
              
                    
                    </li>
                })}
            </ul>
        )
    }

 



   

   
    
  



   
    render(){
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
            
            <div className="HomeLogged">
                <Header />
                <h1>Trouvez une activité</h1>

               <a className="lien" href="/addActivities"> <svg id="plus" xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                 <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg></a>
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