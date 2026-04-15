<<<<<<< HEAD
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
=======
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
>>>>>>> parent of 159940c (1er prototype)
import App from './App.jsx'

<<<<<<< HEAD
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
=======
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
>>>>>>> parent of 159940c (1er prototype)
)
