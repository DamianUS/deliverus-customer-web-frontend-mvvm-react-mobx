import inversifyContainer from "../../config/inversify.config";
import Restaurant from "../../model/restaurant/Restaurant";
import BackendServiceError from "../../model/errors/BackendServiceError";
import {injectable} from "inversify";
import 'reflect-metadata'
import { makeAutoObservable } from "mobx"
import GlobalState from "../GlobalState";
import RestaurantRepository from "../../model/restaurant/interfaces/RestaurantRepository";
import loadingToggler from "../decorators/LoadingToggler";


@injectable()
class IndexRestaurantsViewModel{
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
    async initialize(): Promise<void> {
        try{
            this.restaurants = await this.restaurantRepository.getAll();
        }
        catch(error){
            // @ts-ignore
            if(error.name === "BackendServiceError")
                this.globalState.backendError = error as BackendServiceError;
        }
    }
}

export default IndexRestaurantsViewModel;
