fetch("https://puzzle.mead.io/puzzle").then((response) => {
    //response.json is also a function
    response.json().then((data)=>{
        console.log(data)
    })
})


const weatherForm = document.querySelector("form")
const input = document.querySelector("input")
const message1 = document.querySelector("#message_1")
const message2 = document.querySelector("#message_2")
weatherForm.addEventListener("submit", (e)=>{
    e.preventDefault()
    const location = input.value
    message1.textContent = "Loading..."
    message2.textContent = ""
    fetch("/weather?address="+location).then((response) => {
    //response.json is also a function
    
    response.json().then((data)=>{
        if(data.error){
            message1.textContent = ""
            message2.textContent = data.error
            console.log(data.error)
        }

        else{
            message1.textContent = data.address
            message2.textContent =  data.weatherDescription +": "+ data.weather + " degrees but it feels like " + data.feelsLike +" degrees. The humidity is " + data.humidity +"%."
            console.log("forecast is " + data.weather )
            console.log("forecast is " + data.feelsLike )
            console.log("address is " + data.address )
        }
    })
})
}
)