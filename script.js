const apiKey = "91a11aa7ee1ef567c2da80802debb8f8";
        const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
        const searchBox = document.querySelector(".search input");
        const searchBtn = document.querySelector(".search button");
        const weatherIcon = document.querySelector(".weather-icon");

        async function checkWeather(city) {
            try {
                const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
                if (!response.ok) {
                    throw new Error("City not found");
                }
                const data = await response.json();

                document.querySelector(".city").innerHTML = data.name;
                document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
                document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
                document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

                if(data.weather[0].main=="Clouds"){
                    weatherIcon.src="cloudy.png";
                }
                else if(data.weather[0].main=="Clear"){
                    weatherIcon.src="clear.png";
                }
                else if(data.weather[0].main=="Rain"){
                    weatherIcon.src="rain_no_bg.png";
                }
                else if(data.weather[0].main=="Drizzle"){
                    weatherIcon.src="drizzle.png";
                }
                else if(data.weather[0].main=="Mist"){
                    weatherIcon.src="mist.png";
                }
                document.querySelector(".weather").style.display = "block";
            } catch (error) {
                alert("Invalid city name. Please try again.");
            }
        }

        searchBtn.addEventListener("click", () => {
            if (searchBox.value.trim() !== "") {
                checkWeather(searchBox.value);
            }
        });

        searchBox.addEventListener("keypress", (event) => {
            if (event.key === "Enter" && searchBox.value.trim() !== "") {
                checkWeather(searchBox.value);
            }
        });