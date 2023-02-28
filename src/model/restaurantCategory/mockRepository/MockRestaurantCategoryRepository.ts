import 'reflect-metadata'
import restaurantCategoriesMocked from "./restaurantCategories.json";
import {injectable} from "inversify";
import disableable from "../../mocks/Disableable";
import BaseMockRepository from "../../mocks/BaseMockRepository";
import RestaurantCategory from "../RestaurantCategory";
import MockRestaurantCategoryConversor from "./MockRestaurantCategoryConversor";
@injectable()
class MockRestaurantCategoryRepository extends BaseMockRepository<RestaurantCategory>{
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
