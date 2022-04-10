import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
// import MapViewer from './components/mapViewer';
import MainViewer from './components/mainView';
// import NewMainView from './components/newMainView';
// import {Viewer} from "resium";
ReactDOM.render(
  <React.StrictMode>
    {/* <NewMainView /> */}
    <MainViewer />
  </React.StrictMode>,
  document.getElementById('root')
); 

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();