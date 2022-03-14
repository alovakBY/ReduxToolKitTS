import { memo, FC } from "react";
import dayjs from "dayjs";

import {IWeekDayWeatherItemProps} from '../../../../types'

import classes from "./WeekDayWeatherItem.module.css";

export const WeekDayWeatherItem : FC<IWeekDayWeatherItemProps> = memo(
    ({ day, isActive, handleSetSelectedDay }) => {
        const imageSrc = `http://openweathermap.org/img/wn/${day.weather[0].icon}.png`;
        const maxTemperature = day.temp.max && day.temp.max.toFixed();
        const minTemperature = day.temp.min && day.temp.min.toFixed();
        const shortDay = dayjs(day.dt * 1000).format("ddd");
        return (
            <div
                onClick={()  => handleSetSelectedDay(day.id)}
                className={`${classes.item} ${
                    isActive ? classes.active : null
                }`}
            >
                <div className={classes.text}>{shortDay}</div>
                <div className={classes.image}>
                    <img src={imageSrc} alt="icon" />
                </div>
                <div className={classes.temperatureWrapper}>
                    <div className={classes.maxTemperature}>
                        {maxTemperature}&#176;
                    </div>
                    <div className={classes.minTemperature}>
                        {minTemperature}&#176;
                    </div>
                </div>
            </div>
        );
    }
);
