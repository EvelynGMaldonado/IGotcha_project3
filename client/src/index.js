import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from "react-intl";
import './index.css';
import App from './App';
import LanguageChanger from "./LanguageChanger";


ReactDOM.render(
  <React.StrictMode>
    <LanguageChanger/>
  </React.StrictMode>,
  document.getElementById('root')
);
