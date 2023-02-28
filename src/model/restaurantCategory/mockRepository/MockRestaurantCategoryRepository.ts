import 'reflect-metadata'
import restaurantCategoriesMocked from "./restaurantCategories.json";
import {injectable} from "inversify";
import disableable from "../../mocks/decorators/Disableable";
import BaseMockRepository from "../../mocks/BaseMockRepository";
import RestaurantCategory from "../RestaurantCategory";
import MockRestaurantCategoryConversor from "./MockRestaurantCategoryConversor";
import RestaurantCategoryRepository from "../interfaces/RestaurantCategoryRepository";
@injectable()
class MockRestaurantCategoryRepository extends BaseMockRepository<RestaurantCategory> implements RestaurantCategoryRepository{
    private conversor:MockRestaurantCategoryConversor;
    constructor() {
        super()
        this.conversor = new MockRestaurantCategoryConversor();
        this.entities = restaurantCategoriesMocked.map(restaurantCategoryObject => this.conversor.convertToInternalEntity(restaurantCategoryObject));
    }

    @disableable()
    async getAll(): Promise<RestaurantCategory[]> {
        // @ts-ignore
        return this.entities;
    }
}
export default MockRestaurantCategoryRepository;
