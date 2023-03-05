import 'reflect-metadata'
import Restaurant from "../Restaurant";
import restaurantsMocked from "./restaurants.json";
import {injectable} from "inversify";
import MockRestaurantConversor from "./MockRestaurantConversor";
import BaseMockRepository from "../../mocks/BaseMockRepository";
import RestaurantRepository from "../interfaces/RestaurantRepository";
import User from "../../user/User";
import hasLoggedInUserParameter from "../../decorators/HasLoggedInUserParameter";
import hasUserParameterOfUserType from "../../decorators/HasUserParameterOfUserType";
import UserType from "../../user/UserType";
import Conversor from '../../conversion/interfaces/Conversor';
import disableable from "../../mocks/decorators/Disableable";
import * as yup from "yup";
import {cloneDeep} from "lodash";
import ValidationError from "../../errors/ValidationError";

@injectable()
class MockRestaurantRepository extends BaseMockRepository<Restaurant> implements RestaurantRepository {

    private _conversor:MockRestaurantConversor;
    constructor() {
        super()
        this._conversor = new MockRestaurantConversor();
    }
    get conversor(): Conversor<Restaurant> {
        return this._conversor;
    }
    get mockedEntites(): object[] {
        return restaurantsMocked;
    }
    get creationValidationSchema(): object|undefined {
        return yup.object().shape({
            name: yup
                .string()
                .max(255, 'Name too long')
                .required('Name is required'),
            address: yup
                .string()
                .max(255, 'Address too long')
                .required('Address is required'),
            postalCode: yup
                .string()
                .max(255, 'Postal code too long')
                .required('Postal code is required'),
            url: yup
                .string()
                .nullable()
                .url('Please enter a valid url'),
            shippingCosts: yup
                .number()
                .positive('Please provide a valid shipping cost value')
                .required('Shipping costs value is required'),
            email: yup
                .string()
                .nullable()
                .email('Please enter a valid email'),
            phone: yup
                .string()
                .nullable()
                .max(255, 'Phone too long'),
            category: yup.object({
                id: yup
                    .number()
                    .positive()
                    .integer()
                    .required('Restaurant category is required'),
            })
        });
    }
    get updateValidationSchema(): object|undefined {
        return undefined;
    }
    @disableable()
    @hasLoggedInUserParameter()
    @hasUserParameterOfUserType(UserType.owner)
    async getOwnerRestaurants(owner:User, ...args:any[]): Promise<Restaurant[]> {
        const restaurants = await this.getAll();
        return restaurants.filter(restaurant => restaurant.owner?.id === owner.id);
    }

    @disableable()
    @hasLoggedInUserParameter()
    @hasUserParameterOfUserType(UserType.owner)
    async store(entity: Restaurant, owner:User): Promise<Restaurant> {
        entity.owner = owner;
        return super.store(entity);
    }
}
export default MockRestaurantRepository;
