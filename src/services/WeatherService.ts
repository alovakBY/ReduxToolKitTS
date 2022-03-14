import axios from "axios";
import api from "../api/config";

class WeatherService {
    static instance = new WeatherService();

    getWeather: Function = async function ({
        city,
        units,
    }: {
        city: string;
        units: string;
    }) {
        const response = await this.getCoordinates(city);

        if (!response) return null;

        const { name, country, lat, lon } = response;

        const witherDataFull = await axios.all([
            this.getWeatherData(lat, lon, units),
            this.getAirPolutionData(lat, lon),
        ]);

        const airQuality = witherDataFull[1].data.list[0].main.aqi;
        const weatherData = witherDataFull[0].data;

        return {
            weatherData,
            airQuality,
            name,
            country,
        };
    };

    getCoordinates = async function (city: string) {
        const responseCoordinates = await api.get("/geo/1.0/direct", {
            params: { q: city },
        });
        return responseCoordinates.data[0];
    };

    getWeatherData = (lat: number, lon: number, units: string) => {
        return api.get("/data/2.5/onecall", {
            params: { lat, lon, exclude: "minutely,hourly,alerts", units },
        });
    };

    getAirPolutionData = (lat: number, lon: number) => {
        return api.get("/data/2.5/air_pollution", {
            params: { lat, lon },
        });
    };
}

export default WeatherService.instance;
