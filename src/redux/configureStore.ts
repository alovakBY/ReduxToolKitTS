import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import  weatherReducer  from "../pages/weather/reducers";

export const store = configureStore({
    reducer: {
        weatherPage: weatherReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;