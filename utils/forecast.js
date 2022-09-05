const request = require("postman-request")

const url = "http://api.weatherstack.com/current?access_key=d95db19014a4b819ef3418c64be5bc3e&query="



const forecast = (latitude,longitude,callback) => {
    const urlUpdated= url + latitude+","+longitude
    console.log(urlUpdated)
    request({url:urlUpdated, json:true},(error,response,body) =>{
        if(error){
            callback("Unable to connect to API",undefined)
        }
        else if(body.error){
            callback("Unable to find weather location",body.error)
        }
        else{
            callback(undefined,{
                weather: body.current.temperature,
                feelsLike: body.current.feelslike,
                weatherDescription:body.current.weather_descriptions[0],
                humidity: body.current.humidity,
                windSpeed: body.current.wind_speed,
                address: body.location.name + "," +body.location.region+","+body.location.country
            })
        }
    })
}

module.exports=forecast