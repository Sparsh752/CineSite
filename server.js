const express = require('express');
const mongoose=require('mongoose');
const app = express();
const Movie=require('./models/movies');
const Admin=require('./models/admin')
const URI="mongodb+srv://Sparsh:Sparsh89@cinereview.grry8bf.mongodb.net/Movie-list?retryWrites=true&w=majority"
// const cors = require('cors')

const PORT = process.env.PORT || 5000;
if(process.env.NODE_ENV == "production"){
  app.use(express.static("client/build"));
   
}
mongoose.connect(URI,{ useNewUrlParser:true,useUnifiedTopology:true}).then((result)=>app.listen(PORT,()=>{console.log("Server started on port 5000")})).catch((err)=>{
  console.log(err);
})
const router=express.Router();
// app.use(cors())
app.get("/api",(req,res)=>{
    Movie.find().then((result)=>{
      res.send(result);
    }).catch((err)=>{
      console.log(err);
    })
  })
app.get("/users",(req,res)=>{
    Admin.find().then((result)=>{
        res.send(result);
      }).catch((err)=>{
        console.log(err);
      })
    }
)
app.get("/add/:name/:genre/:rating",(req,res)=>{
    const movie = new Movie({
      name: req.params.name,
      genre: req.params.genre,
      rating: req.params.rating
    })
    movie.save()
    res.send([
      {
        "name":"sparsh"
      }
    ])
  })

app.get("/delete/:id",(req,res)=>{
  console.log(req.params.id);
  Movie.findByIdAndDelete(req.params.id).then(result=>{
    res.send([
      {
        "name":"sparsh"
      }
    ])
  }).catch(err=>console.log(err))
  
})
