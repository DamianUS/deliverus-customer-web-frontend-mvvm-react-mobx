import RestaurantCategory from "../../../model/models/restaurantCategory/RestaurantCategory";
import User from "../../../model/models/user/User";
import BaseConversor from "../../../model/conversion/BaseConversor";
import Restaurant from "../../../model/models/restaurant/Restaurant";
import inversifyContainer from "../../../config/inversify.config";
import RestaurantCategoryRepository from "../../../model/models/restaurantCategory/interfaces/RestaurantCategoryRepository";


type FormRestaurantObject = {
    name: string | undefined,
    description?: string | undefined,
    address: string | undefined,
    postalCode: string | undefined,
    url?: string | undefined,
    shippingCosts: number | undefined,
    email?: string | undefined,
    phone?: string | undefined,
    status?: string | undefined,
    logo?: string | undefined,
    heroImage?: string | undefined,
    restaurantCategoryId: number | undefined,
}
const convertToRestaurantCategoryId = (restaurantCategory: RestaurantCategory): number => {
    return restaurantCategory.id ?? -1;
}

const convertToUserId = (user: User): number => {
    return user.id ?? -1;
}

class FormRestaurantConversor extends BaseConversor<Restaurant> {
    getEmptyInternalEntity(): Restaurant {
        return new Restaurant()
    }
    getExternalObjectWithAllPropertiesEmpty(): FormRestaurantObject {
        return {
            "name": undefined,
            "description": undefined,
            "address": undefined,
            "postalCode": undefined,
            "url": undefined,
            "shippingCosts": undefined,
            "email": undefined,
            "phone": undefined,
            "logo": undefined,
            "heroImage": undefined,
            "status": undefined,
            "restaurantCategoryId": undefined,
        };
    }

    getMapperToObtainExternalObject(): Record<string, any> {
        return {
            restaurantCategoryId: {"category": convertToRestaurantCategoryId},
            /*createdAt: {"createdAt": convertDateToString},
            updatedAt: {"updatedAt": convertDateToString},*/
            userId: {"owner": convertToUserId}
        }
    }

    getMapperToObtainInternalEntity(): Record<string, any> {
        return {
            category: {
                "restaurantCategoryId": async (restaurantCategoryId: number): Promise<RestaurantCategory | undefined> => {
                    //This anonymous function is needed because of limitations of Javascript. In other languages, I had passed a static method, but...
                    const restaurantCategoryRepository = inversifyContainer.get<RestaurantCategoryRepository>("RestaurantCategoryRepository");
                    return restaurantCategoryRepository.getById(restaurantCategoryId);
                }
            },
            //owner: {"user": convertToOwner },
            /*createdAt: {"createdAt": convertToDate},
            updatedAt: {"updatedAt": convertToDate},*/
        }
    }

}

export default FormRestaurantConversor
export type {FormRestaurantObject}
