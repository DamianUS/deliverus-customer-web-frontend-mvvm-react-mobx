import 'reflect-metadata'
import restaurantCategoriesMocked from "./restaurantCategories.json";
import {injectable} from "inversify";
import disableable from "../../mocks/decorators/Disableable";
import BaseMockRepository from "../../mocks/BaseMockRepository";
import RestaurantCategory from "../RestaurantCategory";
import MockRestaurantCategoryConversor from "./MockRestaurantCategoryConversor";
import RestaurantCategoryRepository from "../interfaces/RestaurantCategoryRepository";
import Conversor from '../../conversion/interfaces/Conversor';

@injectable()
class MockRestaurantCategoryRepository extends BaseMockRepository<RestaurantCategory> implements RestaurantCategoryRepository {
    private _conversor:MockRestaurantCategoryConversor;
    constructor() {
        super()
        this._conversor = new MockRestaurantCategoryConversor();
    }
    get mockedEntites(): object[] {
        return restaurantCategoriesMocked;
    }
    get conversor(): Conversor<RestaurantCategory> {
        return this._conversor
    }
    get creationValidationSchema(): object|undefined {
        return undefined;
    }

    get updateValidationSchema(): object|undefined {
        return undefined;
    }
}
export default MockRestaurantCategoryRepository;
