import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from "./App";
import {Provider} from 'react-redux';
import {store} from './services/store';
import {HashRouter as Router, Routes, Route} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLLIElement);
root.render(
    // <React.StrictMode>
        <Provider store={store}>
            <Router basename="/">
                <Routes>
                    <Route path='/*' element={<App/>}/>
                </Routes>
            </Router>
        </Provider>
    // </React.StrictMode>
);
