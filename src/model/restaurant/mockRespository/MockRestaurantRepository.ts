import 'reflect-metadata'
import Restaurant from "../Restaurant";
import restaurantsMocked from "./restaurants.json";
import {injectable} from "inversify";
import MockRestaurantConversor from "./MockRestaurantConversor";
import BaseMockRepository from "../../mocks/BaseMockRepository";
import RestaurantRepository from "../interfaces/RestaurantRepository";
@injectable()
class MockRestaurantRepository extends BaseMockRepository<Restaurant> implements RestaurantRepository{
    private conversor:MockRestaurantConversor;
    constructor() {
        super()
        this.conversor = new MockRestaurantConversor();
        this.entities = restaurantsMocked.map(restaurantObject => this.conversor.convertToInternalEntity(restaurantObject));
    }
}
export default MockRestaurantRepository;
