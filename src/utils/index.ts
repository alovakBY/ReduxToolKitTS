import { WIND_DIRECTIONS } from "../constants";

export const getTime = (time: number) => {
    if (!time) return;
    const date = new Date(time * 1000);
    const newTime = date
        .toLocaleString("utc", {
            hour: "2-digit",
            hour12: true,
        })
        .split(" ")
        .join("");

    return newTime[0] === "0" ? newTime.substring(1) : newTime;
};

export const getWeatherDescription = (description: string) => {
    return `${description[0].toUpperCase()}${description.substring(1)}`;
};

export const getWindInfo = (
    deg: number,
    speed: number,
    isMetric: boolean
): string => {
    const direction =
        deg > 336
            ? "N"
            : Object.keys(WIND_DIRECTIONS).find((direction: string) => {
                  return deg < WIND_DIRECTIONS[direction];
              });

    const speedMetric = isMetric ? "M/S" : "MPH";

    return `${speed.toFixed()} ${speedMetric} ${direction}`;
};
