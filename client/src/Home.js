import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faStar } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import axios from  'axios';
import { Link } from 'react-router-dom';
const Home = () => {
    const [lists,setLists]=useState([]);
    useEffect(()=>{
      axios.get('/api').then(res=>{
        setLists(res.data)
        console.log(res.data)
      }).catch(err=>{
        console.log(err);
      })
      
    },[])
    const [keyword,setKeyword]=useState('')
    const stars=[0,0,0,0,0]
    return (
        <div className="Home">
      <nav className="navbar nav">
        <div className="container-fluid">
        <Link to="/" className="title">CineReview</Link>
        
          <form className="d-flex" role="search">
            <div className="box">
            <Link to="/login" className='loginlink'>Admin Login</Link>
              <FontAwesomeIcon className="icon" icon={faMagnifyingGlass}/>
              <input className="search" type="text" value={keyword} onChange={(e)=>setKeyword(e.target.value)} placeholder="Search..." aria-label="Search"></input>
            </div>
          
            {/* <button class="btn btn-outline-danger" type="submit">Search</button> */}
          </form>
        </div>
      </nav>
      <div className="body">
        
      { lists.map(row => { 
        if(row.name.toUpperCase().search(keyword.toUpperCase()) !== -1){

       return <div className="card-deco shadow-lg">
        <img src="/poster.jpeg" width={270} height={300} className="card-img-top cover" alt="cover"/>
        <div className="card-b">
          <h5 className="movietitle">{row.name}</h5>
          <span className='info'>{row.genre}</span><br />
          <div className="star">
            {stars.map((_,index)=>{
                if(index<row.rating.toPrecision(1)){
                    return <FontAwesomeIcon key={index} className="goldstar" icon={faStar}/>
                }else{
                    return <FontAwesomeIcon key={index} className="blackstar" icon={faStar}/>
                }
                
            })}
          </div>
        </div>
        </div>
      }else{
        return <div/>;
      }})} 

      
      
      </div>
    </div>
    );
}
 
export default Home;