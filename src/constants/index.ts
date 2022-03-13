export interface IAirQuality {
    [index: number]: string 
}

export interface IWindDirecton {
    [index: string]: number 
}

export const AIR_QUALITY : IAirQuality = {
    1: "Good",
    2: "Fair",
    3: "Moderate",
    4: "Poor",
    5: "Very Poor",
};

export const WIND_DIRECTIONS : IWindDirecton  = {
    N: 23,
    NE: 68,
    E: 113,
    SE: 158,
    S: 203,
    SW: 248,
    W: 293,
    NW: 336,
};

export const MEASUREMENT_SYSTEM  = {
    METRIC: "metric",
    IMPERIAL: "imperial",
};
