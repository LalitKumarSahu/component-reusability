import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import HomePickup from './components/HomePickup'
import MapView from './components/MapView'
import './styles.css'
import './components/map-styles.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/home-pickup' element={<HomePickup />} />
        <Route path='/map' element={<MapView />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)