import Restaurant from "../Restaurant";
import Repository from "../../interfaces/Repository";
import restaurantsMocked from "./restaurants.json";
import {convertToRestaurant} from "./MockRestaurantConversor";
class MockRestaurantRepository implements Repository<Restaurant>{

    private restaurants:Restaurant[];
    constructor() {
        this.restaurants = restaurantsMocked.map(restaurantObject => convertToRestaurant(restaurantObject));
    }

    getAll(): Restaurant[] {
        // @ts-ignore
        return this.restaurants;
    }

    getById(id: number): Restaurant {
        // @ts-ignore
        return this.restaurants.find(restaurantObject => restaurantObject.id == id);
    }

    removeById(id: number): void {
        if(!id || !this.restaurants.find(restaurant => restaurant.id == id))
            throw new Error("This entity is not persisted, can't remove")
        this.restaurants = this.restaurants.filter(restaurant => restaurant.id != id)
    }

    save(entity: Restaurant): void {
        if (entity.id)
            this.update(entity)
        else
            this.store(entity)
    }

    private store(entity: Restaurant): void {
        const ids:number[] = this.getAll().map(restaurant => restaurant.id)
        const lastId = Math.max(...ids)
        entity.id = lastId+1
        this.restaurants.push(entity);
    }

    private update(entity: Restaurant): void {
        const oldEntityIndex = this.getAll()
            .findIndex(storedEntity => storedEntity.id === entity.id)
        if (oldEntityIndex === -1) {
            throw new Error("the entity does not exist")
        }
        this.restaurants[oldEntityIndex] = entity
    }
}

export default MockRestaurantRepository;
