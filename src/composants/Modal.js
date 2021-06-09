import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import './Modal.css'

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import axios from 'axios';
import ActivitieService from "../service/activities.service";




function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleModal() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const[userProfil, setUser]=useState();
  const user = JSON.parse(localStorage.getItem('user'));
  const[lastName, setLastName] = useState("");
  const[firstName, setFirstName] = useState("");
  const[email, setEmail] = useState("");

  useEffect(()=>{
    axios.get("http://localhost:8080/user/me", {headers:{
        Authorization: `Bearer  ${user}`,
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    },
})

.then(({data})=>{
    setUser(data);
    
})
})

const submitUpdateInformation=(evt)=>{
    evt.preventDefault();
    this.form.validateAll();

    ActivitieService.editUser(
        lastName,
        firstName,
        email
        )
}


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div id="modal" style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Edition de votre profil</h2>
    
      <Form onSubmit={submitUpdateInformation}

      >
          <div >
              <label className="col-4 col-form-label" for ="profile-email">Email</label>
              <Input
              className="form-control col-8"
          
              onChange={e=>this.setEmail(e.target.value)}
              />
          </div>
          <div >
              <label className="col-4 col-form-label" for ="profile-prenom">Prenom</label>
              <Input
              className="form-control col-8"
            
              onChange={e=> setFirstName(e.target.value)}
              />

          </div>

          <div >
              <label className="col-4 col-form-label" for ="profile-nom">Nom</label>
              <Input
              className="form-control col-8"
          
              onChange={e=>this.setLastname(e.target.value)}
              />

          </div>

          <div >
              <label className="col-4 col-form-label" for ="profile-prenom">Mot de passe</label>
              <Input
              className="form-control col-8"
           
              />

          </div>

          <div >
              <label className="col-4 col-form-label" for ="profile-prenom">Confirmer Mot de passe</label>
              <Input
              className="form-control col-8"
              />

          </div>

      </Form>
      </div>
   
  );

  return (
    <div>
        <button id="bouton" type="button" class="btn btn-warning" onClick={handleOpen}>   Modifier son profil     <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
</svg></button>
        <i class="bi bi-pencil"></i>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}