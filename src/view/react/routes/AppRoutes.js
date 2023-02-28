import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import App from "../App";
import restaurantRoutes from "./RestaurantRoutes";
function AppRoutes (props) {
  return (
          <BrowserRouter>
              <Routes>
                <Route path="/" element={<App />} />
                  {restaurantRoutes}
              </Routes>
          </BrowserRouter>
  )
}

export default AppRoutes
