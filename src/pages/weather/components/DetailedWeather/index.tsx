import { FC } from "react";
import dayjs from "dayjs";

import { AIR_QUALITY } from "../../../../constants";
import * as utils from "../../../../utils";

import { IDetailedWeatherProps } from "../../../../types";

import classes from "./DetailedWeather.module.css";

export const DetailedWeather: FC<IDetailedWeatherProps> = ({
    city,
    country,
    selectedDay,
    isMetric,
    handleChangeMetric,
}) => {
    const day = selectedDay.dt && dayjs(selectedDay.dt * 1000).format("dddd");

    const time =
        selectedDay.current_time &&
        dayjs(selectedDay.current_time * 1000).format("hA");

    const weatherDescription = utils.getWeatherDescription(
        selectedDay.weather[0].description
    );

    const imageSrc = `http://openweathermap.org/img/wn/${selectedDay.weather[0].icon}.png`;

    const temp = selectedDay.temp.current_temp
        ? selectedDay.temp.current_temp
        : selectedDay.temp.max;

    const windInfo =
        selectedDay.wind_deg &&
        utils.getWindInfo(
            selectedDay.wind_deg,
            selectedDay.wind_speed,
            isMetric
        );

    return (
        <div className={classes.container}>
            <div className={classes.name}>
                {city}, {country}
            </div>
            <div className={classes.description}>
                {day} {time} &#183; {weatherDescription}
            </div>
            <div className={classes.bottom}>
                <div className={classes.bottomLeft}>
                    <div className={classes.image}>
                        <img src={imageSrc} alt="icon" />
                    </div>
                    <div className={classes.bottomWrapper}>
                        <div className={classes.bottomTemp}>
                            {temp && temp.toFixed()}
                            &#176;
                        </div>
                        <sup
                            className={classes.bottomUtils}
                            onClick={handleChangeMetric}
                        >
                            {isMetric ? (
                                <>
                                    <span>F</span>/
                                    <span className={classes.activeMetric}>
                                        C
                                    </span>
                                </>
                            ) : (
                                <>
                                    <span className={classes.activeMetric}>
                                        F
                                    </span>
                                    /<span>C</span>
                                </>
                            )}
                        </sup>
                    </div>
                </div>
                <div className={classes.bottomRight}>
                    <div>Humidity: {selectedDay.humidity}%</div>
                    <div>Wind: {windInfo}</div>
                    {selectedDay.air_quality && (
                        <div>
                            AirQuality: {AIR_QUALITY[selectedDay.air_quality]}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
