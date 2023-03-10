import inversifyContainer from "../../config/inversify.config";
import Restaurant from "../../model/models/restaurant/Restaurant";
import BackendServiceError from "../../model/errors/BackendServiceError";
import {injectable} from "inversify";
import 'reflect-metadata'
import { makeAutoObservable } from "mobx"
import GlobalState from "../GlobalState";
import RestaurantRepository from "../../model/models/restaurant/interfaces/RestaurantRepository";
import loadingToggler from "../decorators/LoadingToggler";
import User from "../../model/models/user/User";
import backendErrorHandled from "../decorators/BackendErrorHandled";


@injectable()
class OwnerRestaurantsViewModel{
    restaurantRepository: RestaurantRepository;
    restaurants: Restaurant[];
    globalState: GlobalState;

    constructor() {
        this.restaurantRepository = inversifyContainer.get<RestaurantRepository>("RestaurantRepository");
        this.globalState = inversifyContainer.get<GlobalState>("GlobalState")
        this.restaurants = [];
        makeAutoObservable(this)
    }

    @loadingToggler()
    @backendErrorHandled()
    async initialize(): Promise<void> {
        this.restaurants = await this.restaurantRepository.getOwnerRestaurants(this.globalState.loggedInUser as User);
    }

    @loadingToggler()
    @backendErrorHandled()
    async remove(restaurant:Restaurant): Promise<void> {
        await this.restaurantRepository.remove(restaurant, this.globalState.loggedInUser);
        this.restaurants = await this.restaurantRepository.getOwnerRestaurants(this.globalState.loggedInUser as User);
    }
}

export default OwnerRestaurantsViewModel;
