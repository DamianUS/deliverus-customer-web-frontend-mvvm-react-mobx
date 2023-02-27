import Restaurant from "../Restaurant";
import Conversor, {convertToDate, convertDateToString} from "../../helpers/Conversor";
import RestaurantCategory from "../../restaurantCategory/RestaurantCategory";
import User from "../../user/User";


const convertToRestaurant = (restaurantObject: object): Restaurant => {
    const emptyRestaurant = new Restaurant()
    const restaurantConversor = new Conversor<Restaurant>()
    return restaurantConversor.convertToEntity(emptyRestaurant, restaurantObject, mapperFromRestaurantProperties)
}

const createEmptyRestaurantObject = (): object => {
    const emptyRestaurantObject = {
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
    }
    return emptyRestaurantObject
}

const convertToObject = (restaurant: Restaurant): object => {
    const emptyRestaurantObject = createEmptyRestaurantObject()
    const restaurantConversor = new Conversor<Restaurant>()
    return restaurantConversor.convertToObject(restaurant, emptyRestaurantObject, mapperFromMockProperties)
}

const convertToRestaurantCategory = (restaurantCategoryObject: object): RestaurantCategory => {
    const mapperFromRestaurantCategoryToMock = {
        createdAt: {"createdAt": convertToDate},
        updatedAt: {"updatedAt": convertToDate},
    }
    const emptyRestaurantCategory = new RestaurantCategory();
    const restaurantCategoryConversor = new Conversor<RestaurantCategory>();
    return restaurantCategoryConversor.convertToEntity(emptyRestaurantCategory, restaurantCategoryObject, mapperFromRestaurantCategoryToMock)
}

const convertToOwner = (ownerObject: object): User | null => {
    // To be implemented
    return null
}

const mapperFromRestaurantProperties = {
    category: {"restaurantCategory": convertToRestaurantCategory},
    owner: {"user": convertToOwner },
    createdAt: {"createdAt": convertToDate},
    updatedAt: {"updatedAt": convertToDate},
}

const convertToRestaurantCategoryId = (restaurantCategory: RestaurantCategory): number => {
    return restaurantCategory.id ?? -1;
}

const mapperFromMockProperties = {
    restaurantCategoryId: {"category": convertToRestaurantCategoryId},
    createdAt: {"createdAt": convertDateToString},
    updatedAt: {"updatedAt": convertDateToString},
}

export {convertToRestaurant, convertToObject}
