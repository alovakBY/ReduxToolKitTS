import { createAsyncThunk } from "@reduxjs/toolkit";
import  api  from "../../../services/WeatherService";

interface IArgs  {
    city: string,
    units: string
}

export const getWeatherThunk = createAsyncThunk(
    "weather/getWeather",
    ({ city , units } : IArgs) => {
        return api.getWeather({ city, units }); 
    }
);
