import 'reflect-metadata'
import Restaurant from "../Restaurant";
import Repository from "../../interfaces/Repository";
import restaurantsMocked from "./restaurants.json";
import {injectable} from "inversify";
import disableable from "../../mocks/Disableable";
import MockRestaurantConversor from "./MockRestaurantConversor";
import BaseMockRepository from "../../mocks/BaseMockRepository";
@injectable()
class MockRestaurantRepository extends BaseMockRepository<Restaurant>{
    private conversor:MockRestaurantConversor;
    constructor() {
        super()
        this.conversor = new MockRestaurantConversor();
        this.entities = restaurantsMocked.map(restaurantObject => this.conversor.convertToInternalEntity(restaurantObject));
    }
}
export default MockRestaurantRepository;
