document.addEventListener("DOMContentLoaded" , () => {
    const cityInput =  document.getElementById("city-input");
    const getweatherbtn =  document.getElementById("get-weather-btn");
    const weatherinfo =  document.getElementById("weather-info");
    const cityname =  document.getElementById("city-name");
    const temperature =  document.getElementById("temperature");
    const description =  document.getElementById("description");
    const errormessage =  document.getElementById("error-message");
    const API_KEY = "2a94ecb797e95e4145ac717a8940b438";
    getweatherbtn.addEventListener("click" ,async () =>{
        const city = cityInput.value.trim();
        if(!city) return;
        // It may throw the error
        // server/database is alwaus in another continent

        try{
            const weatherData = await fetchWeatherData(city);
            DisplayweatherData(weatherData);
        }
        catch(error){
            showError();
        }
    });
    async function fetchWeatherData(city){
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
        const response = await fetch(url);
        console.log(typeof response);
        console.log("RESPONSE", response);
        if(!response.ok){
            throw new Error("City not found");
        }
        const data = await response.json();
        return data;
    }
    function DisplayweatherData(data){
        console.log(data);
        const {name,main,weather} = data;
        cityname.textContent = name;
        temperature.textContent= `Temprature : ${main.temp}`;
        description.textContent= `Weather : ${weather[0].description}`;

        // unlock the display
        weatherinfo.classList.remove("hidden");
        errormessage.classList.add("hidden");
    }

    function showError(){
        weatherinfo.classList.remove("hidden");
        errormessage.classList.remove("hidden");
    }
});