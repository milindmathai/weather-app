const path = require("path")
const express = require("express")
const hbs = require("hbs")
const geocode = require("../utils/geocode")
const forecast = require("../utils/forecast")
const app = express()


const publicDir = path.join(__dirname,"../public")
const partialsPath = path.join(__dirname,"../templates/partials")

//Setting up handlebars and views
app.set("view engine","hbs")
app.set("views", path.join(__dirname,'../templates/views'))
hbs.registerPartials(partialsPath)

//Setup static documents to serve
app.use(express.static(publicDir)) 

//Setting up partials(Headers and footers for each page served)
app.get("/",(req,res)=> {
    res.render("index",{
        title:"Main page",
        name:"Milind"
    })})
app.get("/help",(req,res) => {
    res.render("help",{
        title:"Help page",
        helpText:"This is some help text",
        name:"Milind"
    })
})
app.get("/about",(req,res)=>{
    res.render("about",{
        title:"About page",
        name:"Milind"
    })
})
app.get("/weather",(req,res) => {
    if(!req.query.address){
        //Added instead of else condition
        return res.send({
            error:"Please pass address"
        })
    }
    geocode(req.query.address,(error,{latitude, longitude} = {})=>{
        if(error){
            console.log("The error is " +error)
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, {weather, feelsLike}= {}) => {
            if(error){
                return res.send(error)
            }
            res.send({
                weather: weather,
                feelsLike: feelsLike ,
                address: req.query.address
            })
            
            console.log("Weather in " + req.query.address + " is " + weather + " and it feels like "  + feelsLike)
          })
        
    })
    
})
app.get("/help/*",(req,res) => {
    res.render("notFound",{
        title:"404",
        error:"help article not found",
        name:"Milind"
    })
})
app.get("*",(req,res)=>{
    res.render("notFound",{
        title:"404",
        error:"page doesnt exist",
        name:"Milind"
    })
})

app.listen(3000,() => {    console.log("Server is up and running on port 3000")
})