import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { WeatherContainer } from "./pages/weather/containers/WeatherContainer";

import { store } from "./redux/configureStore";

import "./index.css";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <WeatherContainer />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
