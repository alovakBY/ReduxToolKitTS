import { useEffect, useState, useRef, useCallback } from "react";

import { useAppDispatch, useAppSelector } from "../../../hooks";

import { WeatherLayout } from "../components/WeatherLayout";

import { getWeatherThunk } from "../thunks";
import { MEASUREMENT_SYSTEM } from "../../../constants";
import { setSelectedDay } from '../reducers'

import {IWeatherState, IWeatherDay} from '../../../types'


export const WeatherContainer = () => {
    const [textInput, setTextInput] = useState("");
    const [isMetric, setIsMetric] = useState(true);
    const setTimeoutId = useRef<number | undefined>(undefined);
    const inputFocus = useRef<HTMLInputElement>(null!);

    const dispatch = useAppDispatch();
    const { selectedDay, notFound, isLoading, errors, weather, currentDay, city, country } =
    useAppSelector<IWeatherState>((state) => state.weatherPage);

    useEffect(() => {
        if (currentDay) {
            dispatch(setSelectedDay(currentDay))
        } ;
    }, [currentDay]);

    useEffect(() => {
        if (selectedDay.dt) {
            const units = isMetric
                ? MEASUREMENT_SYSTEM.METRIC
                : MEASUREMENT_SYSTEM.IMPERIAL;
            dispatch(getWeatherThunk({ city: textInput, units }));
        }
    }, [isMetric]);

    useEffect(() => {
        if (notFound) {
            setTextInput("not existed location");
        }
    }, [notFound]);

    const handleChangeInput = useCallback(
        (event) => {
            setTextInput(event.target.value);

            if (!event.target.value) {
                window.clearTimeout(setTimeoutId.current);
                return;
            }

            clearTimeout(setTimeoutId.current);
            setTimeoutId.current  = window.setTimeout(() => {
                const units = isMetric ? "metric" : "imperial";
                dispatch(
                    getWeatherThunk({
                        city: event.target.value,
                        units,
                    } )
                );
            }, 1000);
        },
        [isMetric]
    );

    const handleClearInput = useCallback(() => {
        clearTimeout(setTimeoutId.current);
        setTextInput("");
        inputFocus.current.focus();
    }, []);

    const handleSetSelectedDay = useCallback(
        (id) => {
            if (id === currentDay?.id) {
                dispatch(setSelectedDay(currentDay));
            } else {
                const index = weather.findIndex((day : IWeatherDay) => {
                    return day.id === id;
                });
                dispatch(setSelectedDay(weather[index]));
            }
        },
        [weather]
    );

    const handleChangeMetric = useCallback(() => {
        setIsMetric(!isMetric);
    }, [isMetric]);

    return (
        <WeatherLayout
            isLoading={isLoading}
            errors={errors}
            textInput={textInput}
            selectedDay={selectedDay}
            city={city}
            country={country}
            weather={weather}
            isMetric={isMetric}
            notFound={notFound}
            inputFocus={inputFocus}
            handleChangeMetric={handleChangeMetric}
            handleClearInput={handleClearInput}
            handleChangeInput={handleChangeInput}
            handleSetSelectedDay={handleSetSelectedDay}
        />
    );
};
