const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const movieSchema=new Schema({
    name:{
        type : String,
        required:true
    },
    genre:{
        type : String,
        required :true
    },
    rating:{
        type : Number,
        required : true
    }
});
const Movie=mongoose.model('movie',movieSchema);
module.exports=Movie