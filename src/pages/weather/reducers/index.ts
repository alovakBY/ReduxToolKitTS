import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import { getWeatherThunk } from "../thunks";

import { IWeatherState, IWeatherDay } from "../../../types";

const initialState: IWeatherState = {
    country: "",
    city: "",
    weather: [],
    currentDay: null,
    notFound: false,
    selectedDay: {
        dt: 0,
        current_time: 0,
        weather: [
            {
                id: "",
                main: "",
                description: "",
                icon: "",
            },
        ],
        temp: {
            min: 0,
            max: 0,
            current_temp: 0,
        },
        wind_deg: 0,
        wind_speed: 0,
        humidity: 0,
        air_quality: 0,
        id: "",
    },
    isLoading: false,
    errors: null,
};

const weatherReducer = createSlice({
    name: "weather",
    initialState,
    reducers: {
        setSelectedDay: (state, { payload }) => {
            state.selectedDay = payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getWeatherThunk.pending, (state) => {
                state.isLoading = true;
                state.errors = null;
                state.notFound = false;
            })
            .addCase(getWeatherThunk.fulfilled, (state, { payload }) => {
                if (!payload) {
                    state.notFound = true;
                    state.isLoading = false;
                    return;
                }

                const { dt, temp, humidity, wind_speed, wind_deg, weather } =
                    payload.weatherData.current;

                const currentCopy: IWeatherDay = {
                    dt,
                    humidity,
                    wind_speed,
                    wind_deg,
                    air_quality: payload.airQuality,
                    current_time: dt,
                    temp: {
                        current_temp: temp,
                    },
                    weather,
                    id: "",
                };

                const weatherDaily = payload.weatherData.daily.map(
                    (day: IWeatherDay, index: number) => {
                        const id = uuid();
                        const {
                            dt,
                            temp,
                            humidity,
                            wind_speed,
                            wind_deg,
                            weather,
                        } = day;
                        if (index === 0) currentCopy.id = id;
                        return {
                            dt,
                            temp: {
                                max: temp.max,
                                min: temp.min,
                            },
                            humidity,
                            wind_speed,
                            wind_deg,
                            weather,
                            id,
                        };
                    }
                );
                state.country = payload.country;
                state.city = payload.name;
                state.weather = [...weatherDaily];
                state.currentDay = currentCopy;
                state.isLoading = false;
                state.notFound = false;
                state.errors = null;
            })
            .addCase(getWeatherThunk.rejected, (state, { error }) => {
                state.isLoading = false;
                state.notFound = false;
                if (error.message) state.errors = error.message;
            });
    },
});

export const { setSelectedDay } = weatherReducer.actions;

export default weatherReducer.reducer;
