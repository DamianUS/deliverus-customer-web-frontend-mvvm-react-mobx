import Restaurant from "../Restaurant";
import Repository from "../../interfaces/Repository";
import restaurantsMocked from "./restaurants.json";
import {convertToRestaurant} from "./MockRestaurantConversor";
class MockRestaurantRepository implements Repository<Restaurant>{

    getAll(): Restaurant[] {
        // @ts-ignore
        return restaurantsMocked.map(restaurantObject => convertToRestaurant(restaurantObject));
    }

    getById(id: number): Restaurant {
        throw new Error("Not implemented");
    }

    remove(entity: Restaurant): void {
        throw new Error("Not implemented");
    }

    removeById(id: number): void {
        throw new Error("Not implemented");
    }

    save(entity: Restaurant): void {
        throw new Error("Not implemented");
    }

}

export default MockRestaurantRepository;
