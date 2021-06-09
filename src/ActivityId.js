import React, {Component} from 'react'
import axios from "axios";


const user = JSON.parse(localStorage.getItem('user'));
export default class ActivityId extends Component {
    constructor(props) {
        super(props);

        this.state={
            activity:[],
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
    console.log(this.state.activity.author.username)

    }
  
  

    render() {
        const {activity}=this.state;

    
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
                        <th scope="row">Author</th>
                        <td>{activity.id}</td>
                    </tr>

                    <tr>
                        <th scope="row">Name</th>
                        <td>{this.state.activity.name}</td>
                    </tr>

                    <tr>
                        <th scope="row">Lieu</th>
                        <td>{this.state.activity.location}</td>
                    </tr>

                    <tr>
                        <th scope="row">Date</th>
                        <td>{this.state.activity.start}</td>
                    </tr>

                    <tr>
                        <th scope="row">Description</th>
                        <td>{this.state.activity.description}</td>
                    </tr>
                </tbody>

            </table>
            <div id="mapid"></div>

           
        </div>
    )

    }
}
