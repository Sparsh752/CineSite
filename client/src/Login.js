import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";
import axios from "axios";
const Login = () => {
    const [admins,setAdmins]=useState([]);
    useEffect(()=>{
        axios.get('/users').then(res=>{
          setAdmins(res.data)
          console.log(res.data)
        }).catch(err=>{
          console.log(err);
        })
        
      },[])
    const history=useHistory();
    // the details of the admin user is as below, currently there is only one admin user.
    // const adminUser = {
    //     username: "Sparsh",
    //     password: "1234"
    // }
    const [error,setError]=useState("");
    const [details,setDetails]=useState({username:"",password:""});
    const Login = details => {
        console.log(details);
    }
    const handleSubmit = e => {
        e.preventDefault();
        Login(details)
        var check=0;
        admins.map(admin=>{
            if(admin.username===details.username){
                if(admin.password===details.password){
                    console.log("yes");
                    history.push({pathname:'/admin',state:1})

                }else{
                    setError("Incorrect password")
                }
                check=1;
            }
        })
        if(check===0){
            setError("Username doesn't exists");
        }
        
    }
    return (
        <div className="Login">
            <nav className="navbar nav">
        <div className="container-fluid">
        <Link to="/" className="title">CineReview</Link>
        </div>
      </nav>
      <div className="body">
            <form className="loginform" onSubmit={handleSubmit}>
                <label className="label">Username : </label>
                <input className="username" autoComplete="username" value={details.username} type="text" required placeholder="Enter Your Username" onChange={e => setDetails({...details,username:e.target.value})}></input>
                <label className="label">Password : </label> 
                <input autoComplete="current-password" className="password" value={details.password } type="password" required placeholder="Enter Your Password" onChange={e => setDetails({...details,password:e.target.value})}></input>
                <div className="err">
                        {error}
                    </div>
                <button className="loginbutton">Log In</button>
                
            </form>
            
            
      </div>
        </div>
        
    );
}
 
export default Login;