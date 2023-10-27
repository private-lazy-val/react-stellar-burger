import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from "./App";
import {Provider} from 'react-redux';
import store from './services/store';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {AuthProvider} from "./context/auth-provider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <AuthProvider>
                    <Routes>
                        <Route path='/*' element={<App/>}/>
                    </Routes>
                </AuthProvider>
            </Router>
        </Provider>
    </React.StrictMode>
);
