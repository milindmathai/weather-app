const request = require("postman-request")
const urlGeo = "http://api.positionstack.com/v1/forward?access_key=89054b9d026c52b0d2a6ae06322a15cd&query="

const geocode = (address,callback) =>{
    const urlGeoUpdated = urlGeo+encodeURIComponent(address)+"&limit=1"
    console.log(urlGeoUpdated)
    request({url:urlGeoUpdated,json:true},(error,response,body) =>{
        if(error){
            callback("Unable to connect to API",undefined)
        }
        else if(body.error){
            callback("Unable to find the location",undefined)
        }
        else if(body.data.length == 0){
            callback("Unable to find the location",undefined)
        }
        else{
            //console.log(body)
            callback(undefined,{
                latitude: body.data[0].latitude,
                longitude: body.data[0].longitude
            })
            
        }
    })

}

module.exports = geocode