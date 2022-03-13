import { createAsyncThunk } from "@reduxjs/toolkit";
import { getWeather } from "../../../services/WeatherService";

interface IArgs  {
    city: string,
    units: string
}

export const getWeatherThunk = createAsyncThunk(
    "weather/getWeather",
    ({ city , units } : IArgs) => {
        return getWeather({ city, units }); 
    }
);
