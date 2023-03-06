import inversifyContainer from "../../config/inversify.config";
import Restaurant from "../../model/models/restaurant/Restaurant";
import BackendServiceError from "../../model/errors/BackendServiceError";
import {injectable} from "inversify";
import 'reflect-metadata'
import { makeAutoObservable } from "mobx"
import GlobalState from "../GlobalState";
import RestaurantRepository from "../../model/models/restaurant/interfaces/RestaurantRepository";
import loadingToggler from "../decorators/LoadingToggler";
import backendErrorHandled from "../decorators/BackendErrorHandled";


@injectable()
class IndexRestaurantsViewModel{
    restaurantRepository: RestaurantRepository;
    restaurants: Restaurant[]|undefined;
    globalState: GlobalState;

    constructor() {
        this.restaurantRepository = inversifyContainer.get<RestaurantRepository>("RestaurantRepository");
        this.globalState = inversifyContainer.get<GlobalState>("GlobalState")
        makeAutoObservable(this)
    }

    @loadingToggler()
    @backendErrorHandled()
    async initialize(): Promise<void> {
        this.restaurants = await this.restaurantRepository.getAll();
    }
}

export default IndexRestaurantsViewModel;
