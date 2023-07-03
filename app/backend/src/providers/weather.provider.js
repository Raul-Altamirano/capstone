import axios from "axios";

const apiKey = 'b12b389e1e6f9f56999f3a13d164c63d'

export const APIWeather = async (lat, lon) => {

    let responseWeather;
    let responseGeoCoding;
    const optionsWeather = {

        method: 'GET',
        url: `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&lang=es&exclude=&appid=${apiKey}`

    }

    const optionGeoCoding = {

        method: 'GET',
        url: `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=${1}&appid=${apiKey}`

    }

    console.log(optionsWeather.url)

    await Promise.all([axios(optionsWeather), axios(optionGeoCoding)]).then(result => {

        responseWeather = result[0]
        responseGeoCoding = result[1]
        console.log('Resultado de geo coding', result[1].data[0])
        console.log('Resultado de One API', result[0].data)
    })


    const iconUrl = `https://openweathermap.org/img/wn/${responseWeather.data.current.weather[0].icon}@2x.png`
    console.log(iconUrl)
    console.log('MAIN#####', JSON.stringify(responseWeather.data))
    return {
        current: responseWeather.data.current,
        iconUrl,
        name: responseGeoCoding.data[0]?.local_names?.es ?? responseGeoCoding.data[0]?.name,
        country: responseGeoCoding.data[0]?.country,
        cityName: responseGeoCoding.data[0]?.local_names?.es ?? responseGeoCoding.data[0]?.name,
        country: responseGeoCoding.data[0]?.country,
        description: responseWeather.data.current.weather[0].description,
        temp: responseWeather.data.current.temp,
        feels_like: responseWeather.data.current.feels_like,
        pressure: responseWeather.data.current.pressure,
        sunrise: responseWeather.data.current.sunrise,
        sunset: responseWeather.data.current.sunset,
        wind_speed: responseWeather.data.current.wind_speed,
        humidity: responseWeather.data.current.humidity,
        daily: responseWeather.data.daily,
    }

}