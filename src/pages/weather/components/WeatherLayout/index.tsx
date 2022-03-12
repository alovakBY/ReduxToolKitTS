import { FC } from "react";
import { DetailedWeather } from "../DetailedWeather";
import { WeekDayWeatherItem } from "../WeekDayWeatherItem";
import { NotFound } from "../NotFound";

import {IWeatherLayoutProps, IWeatherDay} from '../../../../types'

import classes from "./WeatherLayout.module.css";

export const WeatherLayout: FC<IWeatherLayoutProps> = ({
    isLoading,
    textInput,
    activeDay,
    city,
    country,
    weather,
    isMetric,
    notFound,
    inputFocus,
    handleChangeInput,
    handleClearInput,
    handleSetActiveDay,
    handleChangeMetric,
}) => {
    return (
        <div className={classes.container}>
            <div className={classes.inputWrapper}>
                <input
                    ref={inputFocus}
                    onChange={handleChangeInput}
                    value={textInput}
                    placeholder="Enter location"
                />
                <button onClick={handleClearInput}>
                    <span>+</span>
                </button>
            </div>
            <div className={classes.bottom}>
                {isLoading ? (
                    <div className={classes.loading}>Loading...</div>
                ) : (
                    <>
                        {notFound ? (
                            <NotFound />
                        ) : (
                            activeDay.dt && (
                                <>
                                    <DetailedWeather
                                        isMetric={isMetric}
                                        activeDay={activeDay}
                                        city={city}
                                        country={country}
                                        handleChangeMetric={handleChangeMetric}
                                    />
                                    <div className={classes.weekDayWrapper}>
                                        {weather.map((day : IWeatherDay) => {
                                            return (
                                                <WeekDayWeatherItem
                                                handleSetActiveDay={
                                                    handleSetActiveDay
                                                }
                                                isActive={
                                                    activeDay.id === day.id
                                                }
                                                day={day}
                                                key={day.id}
                                                />
                                            );
                                        })}
                                    </div>
                                </>
                            )
                        )}
                    </>
                )}
            </div>
        </div>
    );
};
