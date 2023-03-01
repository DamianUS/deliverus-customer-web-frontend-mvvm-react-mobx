import 'reflect-metadata'
import Restaurant from "../Restaurant";
import restaurantsMocked from "./restaurants.json";
import {injectable} from "inversify";
import MockRestaurantConversor from "./MockRestaurantConversor";
import BaseMockRepository from "../../mocks/BaseMockRepository";
import RestaurantRepository from "../interfaces/RestaurantRepository";
import User from "../../user/User";
import hasLoggedInUserParameter from "../../decorators/HasLoggedInUserParameter";
import hasUserParameterOfUserType from "../../decorators/HasUserParameterOfUserType";
import UserType from "../../user/UserType";

@injectable()
class MockRestaurantRepository extends BaseMockRepository<Restaurant> implements RestaurantRepository{
    private conversor:MockRestaurantConversor;
    constructor() {
        super()
        this.conversor = new MockRestaurantConversor();
        this.entities = restaurantsMocked.map(restaurantObject => this.conversor.convertToInternalEntity(restaurantObject));
    }
    @hasLoggedInUserParameter()
    @hasUserParameterOfUserType(UserType.Owner)
    async getOwnerRestaurants(owner:User): Promise<Restaurant[]> {
        return await this.getAll();
    }
}
export default MockRestaurantRepository;
