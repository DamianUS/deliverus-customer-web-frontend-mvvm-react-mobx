import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import {
    GuardConfigProvider,
    GuardProvider,
    GuardedRoutes,
    GuardedRoute,
} from 'react-router-guarded-routes'
import App from "../App";
import restaurantRoutes from "./RestaurantRoutes";
import Login from "../pages/Login";
import retrieveAuthenticatedUser from "./guards/RetrieveAuthenticatedUser";
import isGuest from "./guards/IsGuest";
function AppRoutes (props:object|undefined) {
  return (
          <BrowserRouter>
              {/*<Routes>
                <Route path="/" element={<App />} />
                  {restaurantRoutes}
              </Routes>*/}

              <GuardConfigProvider>
                  <GuardProvider fallback={<div>loading...</div>} guards={[retrieveAuthenticatedUser]}>
                      <GuardedRoutes>
                          <GuardedRoute path="/" element={<App />} />
                          <GuardedRoute path="/login" guards={[isGuest]} element={<Login />} />
                          {restaurantRoutes}
                      </GuardedRoutes>
                  </GuardProvider>
              </GuardConfigProvider>
          </BrowserRouter>
  )
}

export default AppRoutes
