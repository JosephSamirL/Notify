import React from 'react'
import firebase from "firebase/app";
import "firebase/auth";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import {useAuth} from "../context/authContext"
import "../App.css"
function Welcome() {
  const history = useHistory()
  const {login} = useAuth()
  async function handleClick(){
    

    try{
      
      await login()
      history.push("/")
    }catch{
      
    }

    

}
    return (
        
        <div className=" bg-dark h-100">
            <div className=" w-100 h-25 bg-info text-center p-4 position-relative"><h2 className="text-light">Welcome To Notify</h2></div>
            <div class="card w-50 mx-auto position-absolute pp shadow p-3 bg-white rounded" >
  
  <div class="card-body text-center">
    <h5 class="card-title mb-4">Welcome</h5>
    <button onClick={handleClick} className="btn btn-info container">Login</button>
    
  </div>
</div>
        </div>
        
    )
}

export default Welcome
