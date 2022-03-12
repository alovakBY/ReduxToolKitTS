import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import { getWeatherThunk } from "../thunks";

import { IWeatherState, IWeatherDay } from '../../../types'


const initialState : IWeatherState = {
    country: "",
    city: "",
    weather: [],
    current: null,
    notFound: false,
    activeDay: {
        dt: null,
        current_time: null,
        weather: [
            {
              id: null,
              main: "",
              description: "",
              icon: ""
            }
        ],
        temp: {
            min: null,
            max: null,
        },
        wind_deg: null,
        wind_speed: null,
        humidity: null,
        air_quality: null
    },
    isLoading: false,
    errors: null,
};

const weatherReducer = createSlice({
    name: "weather",
    initialState,
    reducers: {
        setActiveDay: (state, {payload}) => {
            state.activeDay = payload
        },
        changeNotFound: (state) => {
            state.notFound = !state.notFound
        }
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

                const currentCopy = {
                    ...payload.weatherData.current,
                    air_quality: payload.airQuality,
                    current_time: payload.weatherData.current.dt,
                };

                const weather = payload.weatherData.daily.map((day: IWeatherDay , index: number) => {
                    const id = uuid();
                    if (index === 0) currentCopy.id = id;
                    return {
                        ...day,
                        id,
                    };
                });
                state.country = payload.country;
                state.city = payload.name;
                state.weather = [...weather];
                state.current = currentCopy;
                state.isLoading = false;
                state.notFound = false;
                state.errors = null;
            })
            .addCase(getWeatherThunk.rejected, (state, {error}) => {
                console.log(error)
                state.isLoading = false;
                state.notFound = false;
                state.errors = error.message;
            });
    },
});

export const {setActiveDay, changeNotFound} = weatherReducer.actions

export default weatherReducer.reducer;
