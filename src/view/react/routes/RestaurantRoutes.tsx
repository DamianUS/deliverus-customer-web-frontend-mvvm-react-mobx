import React from 'react'
import {
    GuardedRoute,
} from 'react-router-guarded-routes'
import loggedInGuard from "./guards/LoggedInGuard";
import RestaurantList from "../pages/restaurants/RestaurantList";


const basePath = '/restaurants'

const restaurantRoutes = (
    <>
        <GuardedRoute path={basePath} guards={[loggedInGuard]} element={<RestaurantList/>}/>
    </>
)
export default restaurantRoutes
