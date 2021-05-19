import React from 'react'
import './Inscription.css'
import sexes from './Genre'
import sports from './Sport'
import arts from './Art'
import others from './Other'
import fleche from './fleche.png'
import {Link} from 'react-router-dom'


function Inscription(){

    const [lastname,setLastname] =React.useState("");
    const[sex, setSex] =React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [firstname, setFirstname] = React.useState("");
    const [year, setYear] = React.useState("");
    const [sport, setSport] = React.useState("");
    const [art, setArt] = React.useState("");
    const [other, setOther] = React.useState("");
    

    const handleSubmit=(event)=>{

        if(document.getElementById("password").value==document.getElementById("passswordConfirm").value){
            if(document.getElementById("email").value==document.getElementById("mailConfirm").value){
        console.log(`
        Lastname: ${lastname}
        Sex: ${sex}
       
        Email: ${email}
        Password: ${password}
        FirstName: ${firstname}
        Year: ${year}
        Sport:${sport}
        Art:${art}
        Other:${other}
        
        `);

            }else{
                document.getElementById("error-message-mail").innerHTML += 'les deux emails ne correpsondent pas'
            }
        }else{
            document.getElementById("error-message-password").innerHTML += 'les deux mots de passe ne correpsondent pas'
        }

        event.preventDefault();
    }

    return(
        <div className="Inscription">
              <Link to="/">
            <img id="fleche" src={fleche} />

            </Link>
        <h1>Inscrivez-vous</h1>

        <form onSubmit={handleSubmit}>

            <div className="firstPart">

                <div className="firstInfo">
                    <label for="lastname">Nom
                    <input 
                    type="text" 
                    name="lastname" 
                    id="lastname"
                    value={lastname}
                    onChange={e=> setLastname(e.target.value)
                    } required></input></label>

                    <label for="sex">Sexe
                    <select
                    
                    name="sex" 
                    id="sex"
                    value={sex}
                    onChange={e=> setSex(e.target.value)}
                    required>
                        <option key=""></option>

                        {sexes.map(sex=>(
                            <option key={sex}>{sex}
                            </option>                        
                            ))}
                        </select></label>

                    <label for="email">Mail
                    <input 
                    type="text" 
                    name="email"
                    id="email"
                    value={email}
                    onChange={e=> setEmail(e.target.value)
                    }required></input></label>
                    

            


                    <label for="password">Mot de passe
                    <input 
                    type="text" 
                    name="password" 
                    id="password"
                    value={password}
                    onChange={e=> setPassword(e.target.value)
                    }required></input></label>

                </div>


                <div className="secondInfo">

                    <label for="firstname">Prenom
                    <input 
                    type="text" 
                    name="firstname" 
                    id="firstname"
                    value={firstname}
                    onChange={e=> setFirstname(e.target.value)
                    }required></input></label>
            

                    <label for="year">Age
                    <input 
                    type="text" 
                    name="year" 
                    id="year"
                    value={year}
                    onChange={e=>setYear(e.target.value)
                    }required></input></label>

            

                    <label for="mailConfirm">Confimer mail
                    <input 
                    type="text" 
                    name="mailConfirm" 
                    id="mailConfirm"
                    required></input></label>
                    <div id="error-message-mail"></div>

            

                    <label for="passwordConfirm">Confirmer mot de passe
                    <input 
                    type="text" 
                    name="passwordConfirm" 
                    id="passswordConfirm"
                    
                    required></input></label>
                    <div id="error-message-password"></div>

                </div>

            </div>

            <h2>Centres d'interets</h2>

          

                <div className="label">
                <label for="sport">Sports activités</label>

                <label for="other">Autres activités</label>

                <label for="art">Art activités</label>

                </div>

                <div className="input">
                <select 
                name="sport"
                id="sport"
                value={sport}
                onChange={e => setSport
                (e.target.value)}
                required>
                    <option key=""></option>
                    {sports.map(sport=>(
                        <option key={sport}>{sport}</option>
                    ))}



                </select>
                <select
                name="other"
                id="art"
                value={other}
                onChange={e => setOther
                (e.target.value)}
                required>
                    <option key=""></option>
                    {others.map(other=>(
                        <option key={other}>{other}</option>
                    ))}
                </select>
                
                 <select 
                 name="art"
                 id="other"
                 value={art}onChange={e => setArt
                (e.target.value)}
                required>
                    <option key=""></option>
                    {arts.map(art=>(
                        <option key={art}>{art}</option>
                    ))}
                </select>

                
                
                </div>
       
        <div id="champDescription">
                <label for="description">Description</label>
                <textarea  id="description" rows="2" cols="120"/>
                </div>
                <button type="submit" id="submit">S'inscrire</button>
            <div>
            <a href="#">Mot de passe oublié ?</a>
            </div>
        </form>

        </div>
    )
}

export default Inscription;