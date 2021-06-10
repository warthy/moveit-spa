import React, { Component } from 'react'
import axios from "axios";

const user = JSON.parse(localStorage.getItem('user'));
export default class UserID extends Component {

    constructor(props) {
        super(props);
        this.getFriend=this.getFriend.bind(this);

        this.state={
            user:[],
        };
    }



      getFriend(friends_id){
        alert('yo')
       return axios({
           method: 'POST',
           url:"http://localhost:8080/user/friend/?id="+this.props.match.params.id,
           data:{
               friends_id
           },

           headers: {
               Authorization: `Bearer  ${user}`,
               'Content-Type': 'application/json;charset=UTF-8',
               'Access-Control-Allow-Origin' : '*',
               'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
           }
       })
    }

    componentDidMount() {
        this.getUser();
    }

    async getUser() {
        const response = axios.get("http://localhost:8080/user/"+this.props.match.params.id,{headers:{
        Authorization: `Bearer  ${user}`,
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        },
    })

    const  {data} =await response;
    this.setState({user:data})

    }

  

    
    render() {
        const {user} = this.state
       
        return (
            <div>
                 <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th className="col">Champ</th>
                        <th className="col">Valeur</th>
                    </tr>
                </thead>

                <tbody>

                    <tr>
                        <th  scope="row">Username</th>
                        <th>{user.username}</th>

                    </tr>

                    <tr>
                        <th  scope="row">Nom</th>
                        <th>{user.lastName}</th>

                    </tr>

                    <tr>
                        <th  scope="row">Prenom</th>
                        <th>{user.firstName}</th>

                    </tr>

                    <tr>
                        <th  scope="row">Email</th>
                        <th>{user.email}</th>

                    </tr>

                    <tr>
                        <th  scope="row">Description</th>
                        <th>{user.description}</th>

                    </tr>

                    </tbody>

                    </table>

                    <a href = {"/friend/"+user.id} onClick={this.getFriend(user.id)}><button  type="button" class="btn btn-success"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-check-fill" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
  <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
</svg>Ajouter en ami</button></a>
            </div>
        )
    }
}




