import { FC } from "react";
import { DetailedWeather } from "../DetailedWeather";
import { WeekDayWeatherItem } from "../WeekDayWeatherItem";
import { NotFound } from "../NotFound";

import { IWeatherLayoutProps, IWeatherDay } from "../../../../types";

import classes from "./WeatherLayout.module.css";

export const WeatherLayout: FC<IWeatherLayoutProps> = ({
    isLoading,
    errors,
    textInput,
    selectedDay,
    city,
    country,
    weather,
    isMetric,
    notFound,
    inputFocus,
    handleChangeInput,
    handleClearInput,
    handleSetSelectedDay,
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
                ) : errors ? (
                    <div className={classes.error}>
                        Error: {errors} <br />
                        Please try latter
                    </div>
                ) : (
                    <>
                        {notFound ? (
                            <NotFound />
                        ) : (
                            selectedDay.id && (
                                <>
                                    <DetailedWeather
                                        isMetric={isMetric}
                                        selectedDay={selectedDay}
                                        city={city}
                                        country={country}
                                        handleChangeMetric={handleChangeMetric}
                                    />
                                    <div className={classes.weekDayWrapper}>
                                        {weather.map((day: IWeatherDay) => {
                                            return (
                                                <WeekDayWeatherItem
                                                    handleSetSelectedDay={
                                                        handleSetSelectedDay
                                                    }
                                                    isActive={
                                                        selectedDay.id ===
                                                        day.id
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
