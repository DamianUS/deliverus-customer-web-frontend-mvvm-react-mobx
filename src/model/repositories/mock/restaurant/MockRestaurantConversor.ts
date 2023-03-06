import BaseModelConversor from "../../../conversion/BaseModelConversor";
import Restaurant from "../../../models/restaurant/Restaurant";
import {convertDateToString, convertToDate} from "../../../conversion/CommonConversionFunctions";
import RestaurantCategory from "../../../models/restaurantCategory/RestaurantCategory";
import MockRestaurantCategoryConversor, {
    MockRestaurantCategoryObject
} from "../restaurantCategory/MockRestaurantCategoryConversor";
import User from "../../../models/user/User";
import MockUserRepository from "../user/MockUserRepository";
import MockUserConversor from "../user/MockUserConversor";
import UserType from "../../../models/user/UserType";
import RestaurantStatus from "../../../models/restaurant/RestaurantStatus";

type MockRestaurantObject = {
    id: number | undefined,
    name: string | undefined,
    description: string | undefined,
    address: string | undefined,
    postalCode: string | undefined,
    url: string | undefined,
    shippingCosts: number | undefined,
    averageServiceMinutes: number | undefined,
    email: string | undefined,
    phone: string | undefined,
    logo: string | undefined,
    heroImage: string | undefined,
    status: string | undefined,
    restaurantCategoryId: number | undefined,
    restaurantCategory: MockRestaurantCategoryObject | undefined,
    userId: number | undefined
}
const convertToRestaurantCategoryId = (restaurantCategory: RestaurantCategory): number => {
    return restaurantCategory.id ?? -1;
}

const convertToUserId = (user: User): number => {
    return user.id ?? -1;
}

const convertToStatusString = (restaurantStatus: RestaurantStatus): string => {
    if (restaurantStatus.valueOf() === RestaurantStatus.online.valueOf()) {
        return "online";
    }
    if (restaurantStatus.valueOf() === RestaurantStatus.closed.valueOf()) {
        return "closed";
    }
    if (restaurantStatus.valueOf() === RestaurantStatus.temporarilyClosed.valueOf()) {
        return "temporarily closed";
    }
    return "offline";
}

const convertToRestaurantStatus = (stauts: string): RestaurantStatus => {
    if (stauts === "online") {
        return RestaurantStatus.online;
    }
    if (stauts === "closed") {
        return RestaurantStatus.closed;
    }
    if (stauts === "temporarily closed") {
        return RestaurantStatus.temporarilyClosed;
    }
    return RestaurantStatus.offline;
}

class MockRestaurantConversor extends BaseModelConversor<Restaurant> {
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
            "restaurantCategory": undefined,
            "userId": undefined,
        };
    }

    getMapperToObtainExternalObject(): Record<string, any> {
        return {
            restaurantCategoryId: {"category": convertToRestaurantCategoryId},
            createdAt: {"createdAt": convertDateToString},
            updatedAt: {"updatedAt": convertDateToString},
            userId: {"owner": convertToUserId},
            status: {"status": convertToStatusString}
        }
    }

    getMapperToObtainInternalEntity(): Record<string, any> {
        return {
            //owner: {"user": convertToOwner },
            createdAt: {"createdAt": convertToDate},
            updatedAt: {"updatedAt": convertToDate},
            status: {"status": convertToRestaurantStatus},
            category: {
                "restaurantCategory": async (sourceObject: MockRestaurantObject): Promise<RestaurantCategory | undefined> => {
                    //This anonymous function is needed because of limitations of Javascript. In other languages, I had passed a static method, but...
                    const conversor = new MockRestaurantCategoryConversor();
                    return conversor.convertToInternalEntity(sourceObject);
                }
            },
            owner: {
                "userId": async (userId: number): Promise<User | undefined> => {
                    //This anonymous function is needed because of limitations of Javascript. In other languages, I had passed a static method, but...
                    const userRepository = new MockUserRepository();
                    const user = await userRepository.getById(userId);
                    if (user) {
                        const conversor = new MockUserConversor();
                        return conversor.convertToInternalEntity(user);
                    }
                }
            },
        }
    }

}

export default MockRestaurantConversor
export type {MockRestaurantObject}
