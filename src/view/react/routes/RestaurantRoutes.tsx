import React from 'react'
import {
    GuardedRoute,
    GuardProvider,
    GuardedRoutes
} from 'react-router-guarded-routes'
import RestaurantList from "../entities/restaurants/pages/RestaurantList";
import isOwner from "./guards/IsOwner";
import OwnerRestaurantList from "../entities/restaurants/pages/OwnerRestaurantList";


const basePath = '/restaurants'

const restaurantRoutes = (
    <>
        <GuardedRoute path={basePath} element={<RestaurantList/>} guards={[]}></GuardedRoute>
        <GuardedRoute path={`${basePath}-owner`} guards={[isOwner]} element={<OwnerRestaurantList/>} />
    </>
)
export default restaurantRoutes
