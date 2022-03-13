import {LegacyRef, ChangeEventHandler, MouseEventHandler} from 'react'

export interface IWeatherState {
	country: string,
	city: string,
	weather: IWeatherDay[] ,
	current: null | IWeatherCurrent,
	notFound: boolean,
	isLoading: boolean,
	errors: string | null ,
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
		 current_temp: null
	},
	wind_deg: null,
	wind_speed: null,
	humidity: null,
	air_quality: null
}

export interface IWeatherCurrent {
	 air_quality: number,
	 current_time: number,
	 dt: number,
	 id: string,
    temp:  {
	 	current_temp: number,
		max?: number,
	 },
    humidity: number,
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
}

export interface IWeatherDay {
	current_time?: number,
	air_quality?: number,
	id: string,
	dt: number,
	temp: {
	  min: number,
	  max: number,
	  current_temp?: number,
	},
	humidity: number,
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
	handleChangeMetric: MouseEventHandler<HTMLElement>,
 }

 export interface IDetailedWeatherProps {
	city: string,
	country: string,
	activeDay: IActiveDayDeault | IWeatherDay | IWeatherCurrent,
	isMetric: boolean,
	handleChangeMetric: MouseEventHandler<HTMLElement>
 }

 export interface IWeekDayWeatherItemProps {
	day: IWeatherDay,
	isActive: boolean,
	handleSetActiveDay: Function,
 }




