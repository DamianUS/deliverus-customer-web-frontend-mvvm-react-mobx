import BaseConversor from "../../conversion/BaseConversor";
import Restaurant from "../Restaurant";
import {convertDateToString, convertToDate} from "../../conversion/CommonConversionFunctions";
import RestaurantCategory from "../../restaurantCategory/RestaurantCategory";
import MockRestaurantCategoryConversor, {
    MockRestaurantCategoryObject
} from "../../restaurantCategory/mockRepository/MockRestaurantCategoryConversor";

type MockRestaurantObject = {
    id: number|undefined,
    name: string|undefined,
    description: string|undefined,
    address: string|undefined,
    postalCode: string|undefined,
    url: string|undefined,
    shippingCosts: number|undefined,
    averageServiceMinutes: number|undefined,
    email: string|undefined,
    phone: string|undefined,
    logo: string|undefined,
    heroImage: string|undefined,
    status: string|undefined,
    restaurantCategoryId: number|undefined,
    restaurantCategory: MockRestaurantCategoryObject|undefined
}
const convertToRestaurantCategoryId = (restaurantCategory: RestaurantCategory): number => {
    return restaurantCategory.id ?? -1;
}

class MockRestaurantConversor extends BaseConversor<Restaurant>{
    getEmptyInternalEntity(): Restaurant {
        return new Restaurant()
    }

    getExternalObjectWithAllPropertiesEmpty(): MockRestaurantObject {
        return {
            "id": undefined,
            "name": undefined,
            "description": undefined,
            "address": undefined,
            "postalCode": undefined,
            "url": undefined,
            "shippingCosts": undefined,
            "averageServiceMinutes": undefined,
            "email": undefined,
            "phone": undefined,
            "logo": undefined,
            "heroImage": undefined,
            "status": undefined,
            "restaurantCategoryId": undefined,
            "restaurantCategory": undefined
        };
    }

    getMapperToObtainExternalObject(): Record<string, any> {
        return {
            restaurantCategoryId: {"category": convertToRestaurantCategoryId},
            createdAt: {"createdAt": convertDateToString},
            updatedAt: {"updatedAt": convertDateToString},
        }
    }

    getMapperToObtainInternalEntity(): Record<string, any> {
        return {
            category: {"restaurantCategory": (sourceObject:MockRestaurantObject):RestaurantCategory => {
                //This anonymous function is needed because of limitations of Javascript. In other languages, I had passed a static method, but...
                const conversor = new MockRestaurantCategoryConversor();
                return conversor.convertToInternalEntity(sourceObject);
            }},
            //owner: {"user": convertToOwner },
            createdAt: {"createdAt": convertToDate},
            updatedAt: {"updatedAt": convertToDate},
        }
    }

}

export default MockRestaurantConversor
export type {MockRestaurantObject}
