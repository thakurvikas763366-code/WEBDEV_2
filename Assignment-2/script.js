
        let API_KEY = "af9f63c59a649f27d602b96a43d0bd14"
        let form    = document.querySelector("form")
        let city    = document.querySelector("#city")
        let weather = document.querySelector("#city_weather_container")
        let histBox = document.querySelector("#search_cities_box")
        let conBox  = document.querySelector("#console_box")

        let historyList = []

        async function getweather(cityName) {

            // sync logs before fetch
            conBox.innerHTML = ""
            conBox.innerHTML += '<div class="sync_line"><div class="num_badge">1</div><span>Sync Start</span></div>'
            conBox.innerHTML += '<div class="sync_line"><div class="num_badge">2</div><span>Sync End</span></div>'
            conBox.innerHTML += '<div class="async_line">[ASYNC] Start fetching</div>'

            let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`)
            let data = await response.json()

            // async logs after fetch
            conBox.innerHTML += '<div class="sync_line"><div class="num_badge">3</div><span>Promise.then (Microtask)</span></div>'
            conBox.innerHTML += '<div class="sync_line"><div class="num_badge">4</div><span>setTimeout (Macrotask)</span></div>'
            conBox.innerHTML += '<div class="async_line">[ASYNC] Data received</div>'

            if (data.cod != 200) {
                weather.innerHTML = "<span id='error_msg'>City not found</span>"
                return
            }

            let card = document.createElement('div')
            card.innerHTML = `
                <div class="w_row"><span>City</span><span>${data.name}, ${data.sys.country}</span></div>
                <div class="w_row"><span>Temp</span><span>${data.main.temp} °C</span></div>
                <div class="w_row"><span>Weather</span><span>${data.weather[0].main}</span></div>
                <div class="w_row"><span>Humidity</span><span>${data.main.humidity}%</span></div>
                <div class="w_row"><span>Wind</span><span>${data.wind.speed} m/s</span></div>
            `
            weather.innerHTML = ""
            weather.append(card)

            if (historyList.indexOf(data.name) == -1) {
                historyList.unshift(data.name)
            }

            showHistory()
        }

        function showHistory() {
            histBox.innerHTML = ""
            for (let i = 0; i < historyList.length; i++) {
                let tag = document.createElement("span")
                tag.innerText = historyList[i]
                tag.addEventListener("click", function() {
                    getweather(historyList[i])
                })
                histBox.appendChild(tag)
            }
        }

        form.addEventListener("submit", (event) => {
            event.preventDefault()
            getweather(city.value)
        })

        getweather()
