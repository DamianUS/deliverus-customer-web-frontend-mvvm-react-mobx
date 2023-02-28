import inversifyContainer from "../../config/inversify.config";
import Repository from "../../model/interfaces/Repository";
import Restaurant from "../../model/restaurant/Restaurant";
import BackendServiceError from "../../model/errors/BackendServiceError";
import {injectable} from "inversify";
import 'reflect-metadata'

@injectable()
class IndexRestaurantsViewModel{
    restaurantRepository: Repository<Restaurant>;
    restaurants: Restaurant[];
    loading:boolean;
    backendError!:BackendServiceError;

    constructor() {
        this.restaurantRepository = inversifyContainer.get<Repository<Restaurant>>("RestaurantRepository");
        this.restaurants = [];
        this.loading = false;
    }

    async onPageLoad(): Promise<void> {
        this.loading = true;
        try{
            this.restaurants = await this.restaurantRepository.getAll();
        }
        catch(error){
            // @ts-ignore
            if(error.name === "BackendServiceError")
                this.backendError = error as BackendServiceError;
        }
        finally {
            this.loading = false
        }
    }
}

export default IndexRestaurantsViewModel;
