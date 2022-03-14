import {LegacyRef, ChangeEventHandler, MouseEventHandler} from 'react'

export interface IWeatherState {
	country: string,
	city: string,
	weather: IWeatherDay[] ,
	currentDay: null | IWeatherDay,
	notFound: boolean,
	isLoading: boolean,
	errors: string | null ,
	selectedDay: IWeatherDay,
}

export interface IWeatherDay {
	id: string,
	dt: number,
	weather: [
		{
			id: string,
			main: string,
			description: string,
			icon: string
		}
	],
	temp: {
		min?: number,
		max?: number,
		current_temp?: number
	},
	wind_deg: number,
	wind_speed: number,
	humidity: number,
	air_quality?: number,
	current_time?: number,
}

 export interface IWeatherLayoutProps {
	isLoading: boolean,
	errors: null | string,
	textInput: string,
	selectedDay: IWeatherDay ,
	city: string,
	country: string,
	weather: IWeatherDay[],
	isMetric: boolean,
	notFound: boolean,
	inputFocus: LegacyRef<HTMLInputElement> | null,
	handleChangeInput: ChangeEventHandler<HTMLInputElement>,
	handleClearInput: MouseEventHandler<HTMLButtonElement>,
	handleSetSelectedDay: Function,
	handleChangeMetric: MouseEventHandler<HTMLElement>,
 }

 export interface IDetailedWeatherProps {
	city: string,
	country: string,
	selectedDay: IWeatherDay,
	isMetric: boolean,
	handleChangeMetric: MouseEventHandler<HTMLElement>
 }

 export interface IWeekDayWeatherItemProps {
	day: IWeatherDay,
	isActive: boolean,
	handleSetSelectedDay: Function,
 }




