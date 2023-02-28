import inversifyContainer from "../../config/inversify.config";
import Repository from "../../model/interfaces/Repository";
import Restaurant from "../../model/restaurant/Restaurant";
import BackendServiceError from "../../model/errors/BackendServiceError";
import {injectable} from "inversify";
import 'reflect-metadata'
import { makeAutoObservable } from "mobx"
import GlobalState from "../GlobalState";


@injectable()
class IndexRestaurantsViewModel{
    restaurantRepository: Repository<Restaurant>;
    restaurants: Restaurant[];
    globalState: GlobalState;

    constructor() {
        this.restaurantRepository = inversifyContainer.get<Repository<Restaurant>>("RestaurantRepository");
        this.globalState = inversifyContainer.get<GlobalState>("GlobalState")
        this.restaurants = [];
        makeAutoObservable(this)
    }

    async initialize(): Promise<void> {
        this.globalState.loading = true;
        try{
            this.restaurants = await this.restaurantRepository.getAll();
        }
        catch(error){
            // @ts-ignore
            if(error.name === "BackendServiceError")
                this.globalState.backendError = error as BackendServiceError;
        }
        finally {
            this.globalState.loading = false
        }
    }
}

export default IndexRestaurantsViewModel;
