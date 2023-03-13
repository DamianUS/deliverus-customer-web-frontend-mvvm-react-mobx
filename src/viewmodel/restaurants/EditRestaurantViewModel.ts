import inversifyContainer from "../../config/inversify.config";
import Restaurant from "../../model/models/restaurant/Restaurant";
import {injectable} from "inversify";
import 'reflect-metadata'
import { makeAutoObservable } from "mobx"
import GlobalState from "../GlobalState";
import RestaurantRepository from "../../model/models/restaurant/interfaces/RestaurantRepository";
import loadingToggler from "../decorators/LoadingToggler";
import backendErrorHandled from "../decorators/BackendErrorHandled";
import RestaurantCategoryRepository from "../../model/models/restaurantCategory/interfaces/RestaurantCategoryRepository";
import RestaurantCategory from "../../model/models/restaurantCategory/RestaurantCategory";
import * as yup from 'yup';
import FormRestaurantConversor, * as FormRestaurant from "./conversors/FormRestaurantConversor";
import ValidationError from "../../model/errors/ValidationError";
import validationErrorfromYupError from '../conversors/ValidationErrorFromYupConversor';
import RestaurantStatus from "../../model/models/restaurant/RestaurantStatus";
import {FormRestaurantObject} from "./conversors/FormRestaurantConversor";


@injectable()
class EditRestaurantViewModel {
    restaurant: Restaurant | undefined;
    restaurantRepository: RestaurantRepository;
    restaurantCategoryRepository: RestaurantCategoryRepository;
    restaurantCategories: RestaurantCategory[] | undefined;
    statuses: RestaurantStatus[] | undefined;
    initialValues: FormRestaurant.FormRestaurantObject | undefined;
    globalState: GlobalState;
    conversor: FormRestaurantConversor;
    validationError: ValidationError|undefined;
    editionValidationSchema = yup.object().shape({
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
        restaurantCategoryId: yup
            .number()
            .positive()
            .integer()
            .required('Restaurant category is required')
    })
    _validationEnabled: boolean | undefined;
    get validationEnabled(){
        return this._validationEnabled ?? this.globalState.enabledFrontEndValidation;
    }
    set validationEnabled(newValue:boolean){
        this._validationEnabled = newValue;
    }

    constructor() {
        this.restaurantRepository = inversifyContainer.get<RestaurantRepository>("RestaurantRepository");
        this.restaurantCategoryRepository = inversifyContainer.get<RestaurantCategoryRepository>("RestaurantCategoryRepository");
        this.globalState = inversifyContainer.get<GlobalState>("GlobalState");
        this.conversor = new FormRestaurantConversor();
        makeAutoObservable(this)
    }

    @loadingToggler()
    @backendErrorHandled()
    async initialize(idRestaurant: number): Promise<void> {
        this.restaurant = await this.restaurantRepository.getById(idRestaurant);
        if (this.restaurant instanceof Restaurant) {
            this.initialValues = this.conversor.convertToExternalObject(this.restaurant) as FormRestaurantObject;
        }
        this.validationError = undefined;
        this.restaurantCategories = await this.restaurantCategoryRepository.getAll();
        this.statuses = Object.values(RestaurantStatus);
    }

    async terminate(): Promise<void> {
        this.restaurant = undefined
        this.validationError = undefined;
    }

    @loadingToggler()
    @backendErrorHandled()
    async edit(editedRestaurantFormObject: FormRestaurant.FormRestaurantObject):Promise<Restaurant|undefined> {
        try{
            this.validationError = undefined;
            if(this.validationEnabled){
                await this.editionValidationSchema.validate(editedRestaurantFormObject, {abortEarly: false});
            }
            const restaurantConverted = await this.conversor.convertToInternalEntity(editedRestaurantFormObject);
            const restaurant = await this.restaurantRepository.update(restaurantConverted, this.globalState.loggedInUser);
            return restaurant;
        }
        catch(error){
            if(error instanceof yup.ValidationError){
                this.validationError = validationErrorfromYupError(error)
            }
            else if(error instanceof ValidationError){
                this.validationError = error;
            }
            else{
                throw error;
            }
        }
    }
}

export default EditRestaurantViewModel;
