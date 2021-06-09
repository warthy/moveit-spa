import React, { Component } from 'react'
import { Calendar } from '@progress/kendo-react-dateinputs';

export default class Calendrier extends Component {

   
    render() {
        return (
            <div>
                <Calendar 
                   value={this.props.value}
                   onChange={this.props.onChange}
              />
            </div>
        )
    }
}
