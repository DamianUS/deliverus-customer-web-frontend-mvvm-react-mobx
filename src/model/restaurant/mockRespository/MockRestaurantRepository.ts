import 'reflect-metadata'
import Restaurant from "../Restaurant";
import Repository from "../../interfaces/Repository";
import restaurantsMocked from "./restaurants.json";
import {convertToRestaurant} from "./MockRestaurantConversor";
import {injectable} from "inversify";
import BackendServiceError from "../../errors/BackendServiceError";
import disableable from "../../mocks/Disableable"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
@injectable()
class MockRestaurantRepository implements Repository<Restaurant>{

    private restaurants:Restaurant[];
    constructor() {
        this.restaurants = restaurantsMocked.map(restaurantObject => convertToRestaurant(restaurantObject));
    }
    @disableable()
    async getAll(): Promise<Restaurant[]> {
        // @ts-ignore
        return this.restaurants;
    }

    @disableable()
    async getById(id: number): Promise<Restaurant|undefined> {
        const restaurants = await this.getAll()
        // @ts-ignore
        return restaurants.find(restaurantObject => restaurantObject.id == id);
    }
    @disableable()
    async removeById(id: number): Promise<number> {
        const restaurants = await this.getAll()
        const oldCount = restaurants.length
        if(!id || !restaurants.find(restaurant => restaurant.id == id))
            return 0
        this.restaurants = this.restaurants.filter(restaurant => restaurant.id != id)
        return this.restaurants.length - oldCount
    }
    @disableable()
    async save(entity: Restaurant): Promise<Restaurant> {
        if (entity.id)
            return this.update(entity)
        else
            return this.store(entity)
    }
    @disableable()
    private async store(entity: Restaurant): Promise<Restaurant> {
        const restaurants = await this.getAll()
        const ids:number[] = restaurants.map(restaurant => restaurant.id);
        const lastId = Math.max(...ids);
        entity.id = lastId+1;
        this.restaurants.push(entity);
        return entity
    }
    @disableable()
    private async update(entity: Restaurant): Promise<Restaurant> {
        const restaurants = await this.getAll();
        const oldEntityIndex = restaurants.findIndex(storedEntity => storedEntity.id === entity.id)
        if (oldEntityIndex === -1) {
            throw new Error("the entity does not exist")
        }
        this.restaurants[oldEntityIndex] = entity
        return entity
    }
}
export default MockRestaurantRepository;
