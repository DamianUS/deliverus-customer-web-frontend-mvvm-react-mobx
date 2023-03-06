import 'reflect-metadata'
import restaurantCategoriesMocked from "./restaurantCategories.json";
import {injectable} from "inversify";
import disableable from "../decorators/Disableable";
import BaseMockRepository from "../BaseMockRepository";
import RestaurantCategory from "../../../models/restaurantCategory/RestaurantCategory";
import MockRestaurantCategoryConversor from "./MockRestaurantCategoryConversor";
import RestaurantCategoryRepository from "../../../models/restaurantCategory/interfaces/RestaurantCategoryRepository";
import ModelConversor from '../../../conversion/interfaces/ModelConversor';

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
    get conversor(): ModelConversor<RestaurantCategory> {
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
