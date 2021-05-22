import React from 'react'
import Header from'./Header.js'
import './AddActivities.css'


function AddActivities(){

    return(
      
           <div className="AddActivities">
           <Header />
        <h1>Ajouter une activité</h1>

        <form >



    <div className="champ">
        <label for="lastname">Nom de l'activité
        <input 
        type="text" 
        name="lastname" 
        id="lastname"></input></label>

     

        <label for="email">Organisateur
        <input 
        type="text" 
        name="email"
        id="email"></input></label>
        
        </div>


        <div className="champ">
        <label for="password">Type 
        <input 
        type="text" 
        name="password" 
        id="password"></input></label>
       

 


  

        <label for="firstname">Lieu
        <input 
        type="text" 
        name="firstname" 
        id="firstname"></input></label>

</div>

<div className="champ">
        <label for="year">Date
        <input 
        type="text" 
        name="year" 
        id="year"></input></label>
 



       
        <label for="mailConfirm">Heure
        <input 
        type="text" 
        name="mailConfirm" 
        id="mailConfirm"
        required></input></label>
               </div>
        

        <div id="otherParticipant">
        <label>Autres participants</label>
        <textarea  id="description3" rows="2" cols="110"></textarea>

    </div>






    
    


<div id="champDescription2">
    <label id="description" for="description">Informations complémentaires</label>
        <textarea rows="5" cols="145"></textarea>
    </div>



    <button type="submit" id="submit">Ajouter l'évènement</button>

</form>
         

        </div>

      

    );


}

export default AddActivities;
