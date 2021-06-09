import React, { Component } from 'react'
import Modal from './Modal'


export default class Bouton extends Component {

    state={
        visible: false
    }

    show = ()=>{
        this.setState({
            visible: true
        })
    }

    hide = ()=>{
        this.setState({
            visible: false
        })
    }
    render() {
        return (
            <div>
                 <Modal 
                
                visible={this.state.visible}
                hide={this.hide}
                />
                <button onClick={this.show}>Edit Profil</button>
               
            </div>
        )
    }
}
