import React from 'react'
import { Route } from 'react-router-dom'
import RestaurantList from "../pages/RestaurantList";

const basePath = '/restaurants'

const restaurantRoutes = (
    <>
        <Route path={basePath} element={<RestaurantList />}/>
    </>
)
export default restaurantRoutes
