import {LegacyRef, ChangeEventHandler, MouseEventHandler} from 'react'

export interface IWeatherState {
	country: string,
	city: string,
	weather: IWeatherDay[] ,
	current: null | IWeatherCurrent,
	notFound: boolean,
	isLoading: boolean,
	errors: unknown,
	activeDay: IActiveDayDeault | IWeatherDay | IWeatherCurrent,
}

export interface IActiveDayDeault {
	dt: null,
	current_time: null,
	weather: [
		 {
			id: null,
			main: string,
			description: string,
			icon: string
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
}

export interface IWeatherCurrent {
	 air_quality: number,
	 current_time: number,
	 id: string,
	 dt: number,
    sunrise: number,
    sunset: number,
    temp: number,
    feels_like: number,
    pressure: number,
    humidity: number,
    dew_point: number,
    uvi: number,
    clouds: number,
    visibility: number,
    wind_speed: number,
    wind_deg: number,
    weather: [
      {
        id: number,
        main: string,
        description: string,
        icon: string
      }
    ],
    rain: {
      "1h": number
    }
}

export interface IWeatherDay {
	id: string,
	dt: number,
	sunrise?: number,
	sunset?: number,
	moonrise?: number,
	moonset?: number,
	moon_phase?: number,
	temp: {
	  day: number,
	  min: number,
	  max: number,
	  night: number,
	  eve: number,
	  morn: number
	},
	feels_like: {
	  day: number,
	  night: number,
	  eve: number,
	  morn: number
	},
	pressure: number,
	humidity: number,
	dew_point: number,
	wind_speed: number,
	wind_deg: number,
	weather: [
	  {
		 id: number,
		 main: string,
		 description: string,
		 icon: string
	  }
	],
	clouds: number,
	pop: number,
	rain: number,
	uvi: number
 }

 export interface IWeatherLayoutProps {
	isLoading: boolean,
	textInput: string,
	activeDay: IActiveDayDeault | IWeatherDay | IWeatherCurrent ,
	city: string,
	country: string,
	weather: IWeatherDay[],
	isMetric: boolean,
	notFound: boolean,
	inputFocus: LegacyRef<HTMLInputElement> | null,
	handleChangeInput: ChangeEventHandler<HTMLInputElement>,
	handleClearInput: MouseEventHandler<HTMLButtonElement>,
	handleSetActiveDay: Function,
	handleChangeMetric: Function,
 }

 export interface IDetailedWeatherProps {
	city: string,
	country: string,
	activeDay: IActiveDayDeault | IWeatherDay | IWeatherCurrent,
	isMetric: boolean,
	handleChangeMetric: Function
 }




