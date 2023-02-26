import Restaurant from "../Restaurant";
import Conversor, {convertToDate} from "../../helpers/Conversor";
import RestaurantCategory from "../../restaurantCategory/RestaurantCategory";
import User from "../../user/User";


const convertToRestaurant = (restaurantObject: object): Restaurant => {

    const emptyRestaurant = new Restaurant()
    const restaurantConversor = new Conversor<Restaurant>()
    return restaurantConversor.convert(emptyRestaurant, restaurantObject, mapperFromRestaurantToMock)
}

const convertToRestaurantCategory = (restaurantCategoryObject: object): RestaurantCategory => {
    // I need this because if I pass the funcion as parameter (this.convertToDate)
    const mapperFromRestaurantCategoryToMock = {
        createdAt: {"createdAt": convertToDate},
        updatedAt: {"updatedAt": convertToDate},
    }
    const emptyRestaurantCategory = new RestaurantCategory();
    const restaurantCategoryConversor = new Conversor<RestaurantCategory>();
    return restaurantCategoryConversor.convert(emptyRestaurantCategory, restaurantCategoryObject, mapperFromRestaurantCategoryToMock)
}

const convertToOwner = (ownerObject: object): User | null => {
    // To be implemented
    return null
}

const mapperFromRestaurantToMock = {
    category: {"restaurantCategory": convertToRestaurantCategory},
    owner: {"user": convertToOwner },
    createdAt: {"createdAt": convertToDate},
    updatedAt: {"updatedAt": convertToDate},
}

export {convertToRestaurant}
