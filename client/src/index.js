import React from 'react';
import ReactDOM from 'react-dom/client';
import { apiStore } from "./redux/apiStore";
import { Provider } from "react-redux";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.css';
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

let persistor = persistStore(apiStore)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <Provider store={apiStore}>
    <PersistGate loading={null} persistor={persistor}>
    <App />
    </PersistGate>
        </Provider>
  </React.StrictMode>
);

reportWebVitals();
