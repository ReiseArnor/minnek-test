import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bulma/css/bulma.css';
import {
    BrowserRouter as Router,
} from "react-router-dom";
import "./index.css";
import { ProvideAuth } from './hooks/use-auth';

ReactDOM.createRoot(document.getElementById("root")).render(
    <Router>
        <ProvideAuth>
                <App />
        </ProvideAuth>
    </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
