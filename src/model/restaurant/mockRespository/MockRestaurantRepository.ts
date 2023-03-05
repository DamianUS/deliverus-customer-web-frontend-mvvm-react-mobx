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
import Conversor from '../../conversion/interfaces/Conversor';

@injectable()
class MockRestaurantRepository extends BaseMockRepository<Restaurant> implements RestaurantRepository {

    private _conversor:MockRestaurantConversor;
    constructor() {
        super()
        this._conversor = new MockRestaurantConversor();
    }
    get conversor(): Conversor<Restaurant> {
        return this._conversor;
    }
    get mockedEntites(): object[] {
        return restaurantsMocked;
    }
    get creationValidationSchema(): object|undefined {
        return undefined;
    }
    get updateValidationSchema(): object|undefined {
        return undefined;
    }
    @hasLoggedInUserParameter()
    @hasUserParameterOfUserType(UserType.owner)
    async getOwnerRestaurants(owner:User): Promise<Restaurant[]> {
        return await this.getAll();
    }
}
export default MockRestaurantRepository;
