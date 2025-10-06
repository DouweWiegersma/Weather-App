import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';
import {UnitsProvider} from "./Context/UnitsContext.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <UnitsProvider>
        <App />
        </UnitsProvider>


    </React.StrictMode>

);