import BaseConversor from "../../../conversion/BaseConversor";
import RestaurantCategory from "../../../models/restaurantCategory/RestaurantCategory";
import {convertToDate, convertDateToString} from "../../../conversion/CommonConversionFunctions";

type MockRestaurantCategoryObject = {
    id: number|undefined,
    name: string|undefined,
    cratedAt: string|undefined,
    updatedAt: string|undefined,
}
class MockRestaurantCategoryConversor extends BaseConversor<RestaurantCategory>{
    getEmptyInternalEntity(): RestaurantCategory {
        return new RestaurantCategory();
    }

    getExternalObjectWithAllPropertiesEmpty(): MockRestaurantCategoryObject {
        return {
            "id": undefined,
            "name": undefined,
            "cratedAt": undefined,
            "updatedAt": undefined,
        };
    }

    getMapperToObtainExternalObject(): Record<string, any> {
        return {
            createdAt: {"createdAt": convertDateToString},
            updatedAt: {"updatedAt": convertDateToString},
        }
    }

    getMapperToObtainInternalEntity(): Record<string, any> {
        return {
            createdAt: {"createdAt": convertToDate},
            updatedAt: {"updatedAt": convertToDate},
        }
    }

}

export default MockRestaurantCategoryConversor
export type {MockRestaurantCategoryObject}
