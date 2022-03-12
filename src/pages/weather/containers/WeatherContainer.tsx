import { useEffect, useState, useRef, useCallback } from "react";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";

import { WeatherLayout } from "../components/WeatherLayout";

import { getWeatherThunk } from "../thunks";
import { MEASUREMENT_SYSTEM } from "../../../constants";
import { setActiveDay, changeNotFound } from '../reducers'

import {IWeatherState, IWeatherCurrent, IWeatherDay} from '../../../types'


export const WeatherContainer = () => {
    const [textInput, setTextInput] = useState("");
    const [isMetric, setIsMetric] = useState(true);
    const setTimeoutId = useRef<number | undefined>(undefined);
    const inputFocus = useRef<HTMLInputElement>(null!);

    const dispatch = useAppDispatch();
    const { activeDay, notFound, isLoading, errors, weather, current, city, country } =
    useAppSelector<IWeatherState>((state) => state.weatherPage);

    useEffect(() => {
        if (current) {
            dispatch(setActiveDay(current))
        } ;
    }, [current]);

    useEffect(() => {
        if (activeDay.dt) {
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
                dispatch(changeNotFound());
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
        dispatch(changeNotFound());
        inputFocus.current.focus();
    }, []);

    const handleSetActiveDay = useCallback(
        (id) => {
            if (id === current?.id) {
                setActiveDay(current);
            } else {
                const index = weather.findIndex((day) => {
                    return day.id === id;
                });
                setActiveDay(weather[index]);
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
            textInput={textInput}
            activeDay={activeDay}
            city={city}
            country={country}
            weather={weather}
            isMetric={isMetric}
            notFound={notFound}
            inputFocus={inputFocus}
            handleChangeMetric={handleChangeMetric}
            handleClearInput={handleClearInput}
            handleChangeInput={handleChangeInput}
            handleSetActiveDay={handleSetActiveDay}
        />
    );
};
