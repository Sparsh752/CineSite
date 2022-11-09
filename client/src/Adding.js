

import axios from "axios";
import { useEffect, useState } from "react";
import { Link,useHistory } from "react-router-dom";


const Adding = () => {
    const [error,setError]=useState("");
    const [counter,setCounter]=useState(0);
    const history=useHistory();
    
    const [info,setInfo]=useState({name:"",genre:"",rating:0})
    const [lists,setLists]=useState([]);
    useEffect(()=>{
      axios.get('/api').then(res=>{
        setLists(res.data)
        console.log(res.data)
      }).catch(err=>{
        console.log(err);
      })
      
    },[])
    useEffect(()=>{
        const url='/add/'+info.name+'/'+info.genre+'/'+info.rating;
        if(counter===1){
            axios.get(url).then(res=> history.push({pathname:'/admin',state:1})).catch(err =>{
                console.log(err)
            })
        }
        
    },[counter])
    const handleSubmit= e =>{
        e.preventDefault()
        var check=1;
        lists.map(row=>{
            if(row.name.toUpperCase()===info.name.toUpperCase()){
                check=0;
            }
        })
        if(check===1){
            setCounter(1);
        }else{
            setError("Movie already exists");
        }
        
        
    }
    return (
        <div className="Adding">
            <nav className="navbar nav">
        <div className="container-fluid">
          <Link to={{pathname:'/admin',state:1}} className="title">CineReview</Link>
        </div>
      </nav>
        <div className="body" onSubmit={handleSubmit}>
            <form className="add">
                <h1 className="heading">Add your Latest Adventure...</h1>
                <label className="label">Movie Name : </label>
                <input className="moviename" autoComplete="movie" type="text" value={info.name} onChange={e=>{
                    setInfo({...info,name:e.target.value})
                }} required placeholder="Enter the movie name"></input>
                <label className="label">Genre : </label>
                <input className="moviename" autoComplete="movie" value={info.genre} type="text" required placeholder="Enter the Genre" onChange={e=>{
                    setInfo({...info,genre:e.target.value})
                }}></input>
                <label className="label">Rating : {info.rating}</label><span></span>
                <input type="range" min={0} max={50} value={info.rating*10} className="slider" required onChange={e=>{
                    setInfo({...info,rating:e.target.value/10})
                }}/>
                <div className="err">
                        {error}
                    </div>
                <button className="loginbutton">Add Movie</button>
            </form>
        </div>
        </div>
    );
}
 
export default Adding;