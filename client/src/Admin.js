import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass,faStar, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import axios from  'axios';
import { Link,useLocation,useHistory } from 'react-router-dom';

const Admin = () => {
    const [counter,setcounter]=useState(0);
    const history=useHistory()
    const location=useLocation();
    const [lists,setLists]=useState([]);
    useEffect(()=>{
      axios.get('/api').then(res=>{
        setLists(res.data)
        console.log(res.data)
      }).catch(err=>{
        console.log(err);
      })
      
    },[counter])
    const [id,setId]=useState(0);

    useEffect(()=>{
        if(location.state===1){
            // console.log("yes");
        }else{
            history.push('/');
        }
    })
    useEffect(()=>{
        if(counter===1){
            const url='/delete/'+id;
            axios.get(url).then(res=>{
                setcounter(0);
            }).catch(err => console.log(err))
            
        }
        
       
    },[id])
    const [keyword,setKeyword]=useState('')
    const stars=[0,0,0,0,0]
    return (
                <div className="Admin">
      <nav className="navbar nav">
        <div className="container-fluid">
        <Link to={{pathname:'/admin',state:1}} className="title">CineReview</Link>
        
        
          <form className="d-flex" role="search">
          <div>
            <Link to="/add" className='add-button'>Add New Movie</Link>
            <Link to="/" className='add-button'>Log Out</Link>
        </div>
            <div className="box">
            
              <FontAwesomeIcon className="icon" icon={faMagnifyingGlass}/>
              <input className="search" type="text" value={keyword} onChange={(e)=>setKeyword(e.target.value)} placeholder="Search..." aria-label="Search"></input>
            </div>
          
          </form>
        </div>
      </nav>
      <div className="body">
        
      { lists.map(row => { 
        if(row.name.toUpperCase().search(keyword.toUpperCase()) !== -1){

       return <div className="admin-card-deco shadow-lg">
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
            <div className='outertrash'>
                <button className='trash-link' onClick={()=>{
                    setcounter(1);
                    setId(row._id)
                }} > <FontAwesomeIcon className='trash' icon={faTrashCan} /> </button>
                
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
 
export default Admin;