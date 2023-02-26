import { injectable } from 'inversify'
import ViewEngineService from "./interfaces/ViewEngineService";
import ReactDOM from "react-dom/client";
import React from "react";
import App from "../react/App";
import reportWebVitals from "../react/reportWebVitals";
import '../react/index.css';

@injectable()
export default class ReactEngineService implements ViewEngineService {
    initialize(): void {
        const root = ReactDOM.createRoot(
            document.getElementById('root') as HTMLElement
        );
        root.render(
            <React.StrictMode>
                <App />
            </React.StrictMode>
        );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
        reportWebVitals();
    }

}
