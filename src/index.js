import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NewsBoard from './Component/NewsBoard';
import AddNews from './Component/AddNews';
import UpdateNews from './Component/UpdateNews';
import Navbar from './Component/Navbar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/news' element={<App/>}/>
      <Route path='/news/category/:category' element={<NewsBoard />}/>
      <Route path='/AddNews' element={<AddNews/>}/>
      <Route path='/UpdateNews/:_id' element={<UpdateNews/>}/>
    </Routes>
  </BrowserRouter>
  // <React.StrictMode>

  //   <App />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
