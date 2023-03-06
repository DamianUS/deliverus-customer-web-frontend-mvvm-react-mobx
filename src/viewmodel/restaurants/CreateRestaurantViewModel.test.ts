import CreateRestaurantViewModel from "./CreateRestaurantViewModel";
import config from "../../config/config";
import {FormRestaurantObject} from "./conversors/FormRestaurantConversor";
import User from "../../model/models/user/User";
import OwnerRestaurantsViewModel from "./OwnerRestaurantsViewModel";
import UserType from "../../model/models/user/UserType";
import AuthenticationRepository from "../../model/models/authentication/interfaces/AuthenticationRepository";
import MockAuthenticationRepository from "../../model/repositories/mock/authentication/MockAuthenticationRepository";
import exp from "constants";
import MockRestaurantRepository from "../../model/repositories/mock/restaurant/MockRestaurantRepository";

test('CreateRestaurantViewModel has the correct initial state', () => {
    const viewModel = new CreateRestaurantViewModel();
    expect(
        viewModel.restaurantRepository !== undefined &&
        viewModel.restaurantCategoryRepository !== undefined &&
        viewModel.globalState !== undefined &&
        viewModel.conversor !== undefined &&
        viewModel.globalState.loading == false &&
        viewModel.globalState.backendError === undefined &&
        viewModel.globalState.forbiddenError === undefined &&
        viewModel.globalState.authenticationError === undefined
    ).toBeTruthy();
});

test('CreateRestaurantViewModel is loading when CreateRestaurantViewModel starts initializing', () => {
    const viewModel = new CreateRestaurantViewModel();
    viewModel.initialize()
    expect(viewModel.globalState.loading).toBeTruthy();
});

test('CreateRestaurantViewModel has the correct state when finishes initializing', async () => {
    const viewModel = new CreateRestaurantViewModel();
    await viewModel.initialize();
    const isStateCorrect = !config.mock_disabled &&
        viewModel.globalState.loading === false &&
        viewModel.validationError === undefined &&
        viewModel.restaurantCategories !== undefined &&
        viewModel.restaurantCategories.length > 0;
    const isBackendError = config.mock_disabled && viewModel.globalState.backendError !== undefined
    expect(isStateCorrect || isBackendError).toBeTruthy();
});

const createEmptyFormRestaurantObject = ():FormRestaurantObject => {
    const restaurant:FormRestaurantObject = {
        name: undefined,
        address: undefined,
        postalCode: undefined,
        shippingCosts: undefined,
        restaurantCategoryId: undefined
    }
    return restaurant;
}

const createGoodFormRestaurantObject = ():FormRestaurantObject => {
    const restaurant:FormRestaurantObject = {
        name: "Good restaurant",
        address: "Good address",
        postalCode: "G00D",
        shippingCosts: 5,
        restaurantCategoryId: 1
    }
    return restaurant;
}

const createFullGoodFormRestaurantObject = ():FormRestaurantObject => {
    const restaurant:FormRestaurantObject = {
        name: "Good restaurant",
        description: "Good description",
        address: "Good address",
        postalCode: "G00D",
        url: "https://www.goood.url",
        shippingCosts: 5,
        restaurantCategoryId: 1
    }
    return restaurant;
}

const createBadNameFormRestaurantObject = ():FormRestaurantObject => {
    const restaurant:FormRestaurantObject = {
        name: "",
        address: "Good address",
        postalCode: "G00D",
        shippingCosts: 5,
        restaurantCategoryId: 1
    }
    return restaurant;
}

const createBadAddressFormRestaurantObject = ():FormRestaurantObject => {
    const restaurant:FormRestaurantObject = {
        name: "Good restaurant",
        address: "",
        postalCode: "G00D",
        shippingCosts: 5,
        restaurantCategoryId: 1
    }
    return restaurant;
}

const createBadPostalCodeRestaurantObject = ():FormRestaurantObject => {
    const restaurant:FormRestaurantObject = {
        name: "Good restaurant",
        address: "Good address",
        postalCode: "",
        shippingCosts: 5,
        restaurantCategoryId: 1
    }
    return restaurant;
}

const createBadShippingCostsRestaurantObject = ():FormRestaurantObject => {
    const restaurant:FormRestaurantObject = {
        name: "Good restaurant",
        address: "Good address",
        postalCode: "G00D",
        shippingCosts: -5,
        restaurantCategoryId: 1
    }
    return restaurant;
}

const createBadRestaurantCategoryIdRestaurantObject = ():FormRestaurantObject => {
    const restaurant:FormRestaurantObject = {
        name: "Good restaurant",
        address: "Good address",
        postalCode: "G00D",
        shippingCosts: -5,
        restaurantCategoryId: -1
    }
    return restaurant;
}

test('CreateRestaurantViewModel validates errors correctly', async () => {
    const viewModel = new CreateRestaurantViewModel();
    await viewModel.initialize();
    let resultedInValidationError = true;
    const formObjects = [createBadNameFormRestaurantObject(), createBadAddressFormRestaurantObject(), createBadPostalCodeRestaurantObject(), createBadShippingCostsRestaurantObject()]
    for (const formResult of formObjects) {
        await viewModel.create(formResult);
        resultedInValidationError = resultedInValidationError && viewModel.validationError !== undefined;
    }
    const isBackendError = config.mock_disabled && !config.frontend_validation_enabled && viewModel.globalState.backendError !== undefined
    expect(((config.frontend_validation_enabled || !config.mock_disabled) && resultedInValidationError) || isBackendError).toBeTruthy();
});

test('CreateRestaurantViewModel validates go correctly', async () => {
    const viewModel = new CreateRestaurantViewModel();
    await viewModel.initialize();
    let resultedInValidationSuccess = true;
    const formObjects = [createGoodFormRestaurantObject(), createFullGoodFormRestaurantObject()]
    for (const formResult of formObjects) {
        await viewModel.create(formResult);
        resultedInValidationSuccess = resultedInValidationSuccess && viewModel.validationError === undefined;
    }
    const isBackendError = config.mock_disabled && !config.frontend_validation_enabled && viewModel.globalState.backendError !== undefined
    expect(((config.frontend_validation_enabled || !config.mock_disabled) && resultedInValidationSuccess) || isBackendError).toBeTruthy();
});

const mockLoggedInUser = ():User => {
    const user = new User();
    user.token = "algo";
    user.tokenExpiration = new Date(new Date().getTime() + 30*60000);
    return user;
}

const mockExpiredUser = ():User => {
    const user = new User();
    user.token = "algo";
    user.tokenExpiration = new Date(new Date().getTime() - 30*60000);
    return user;
}

test('CreateRestaurant throws Authentication error at create when an expired token is provided', async () => {
    const viewModel = new CreateRestaurantViewModel();
    // eslint-disable-next-line testing-library/no-await-sync-query
    await viewModel.initialize();
    viewModel.globalState.loggedInUser = mockExpiredUser();
    const savedRestaurant = await viewModel.create(createGoodFormRestaurantObject());
    const isBackendError = config.mock_disabled && viewModel.globalState.backendError !== undefined
    const isAuthorizationError = !config.mock_disabled && viewModel.globalState.authenticationError !== undefined
    expect(isBackendError || isAuthorizationError).toBeTruthy();
});

const mockCustomer = ():User => {
    const user = new User();
    user.token = "algo";
    user.tokenExpiration = new Date(new Date().getTime() + 30*60000);
    user.userType = UserType.customer;
    return user;
}
test('CreateRestaurant throws Forbidden error at create when an customer is provided', async () => {
    const viewModel = new CreateRestaurantViewModel();
    // eslint-disable-next-line testing-library/no-await-sync-query
    await viewModel.initialize();
    viewModel.globalState.loggedInUser = mockCustomer();
    const savedRestaurant = await viewModel.create(createGoodFormRestaurantObject());
    const isBackendError = config.mock_disabled && viewModel.globalState.backendError !== undefined
    const isForbiddenError = !config.mock_disabled && viewModel.globalState.forbiddenError !== undefined
    expect(isBackendError || isForbiddenError).toBeTruthy();
});

test('CreateRestaurantViewModel inserts a good restaurant correctly', async () => {
    expect.assertions(1)
    const viewModel = new CreateRestaurantViewModel();
    const authenticationRepository = new MockAuthenticationRepository();
    const restaurantRepository = new MockRestaurantRepository();
    const loggedInOwner = await authenticationRepository.login("owner2@owner.com", "secret");
    if(loggedInOwner){
        await viewModel.initialize();
        viewModel.globalState.loggedInUser = loggedInOwner;
        const oldRestaurants = (await viewModel.restaurantRepository.getAll()).length;
        const oldOwnerRestaurants = (await viewModel.restaurantRepository.getOwnerRestaurants(loggedInOwner)).length;
        const restaurantSaved = await viewModel.create(createGoodFormRestaurantObject());
        const newRestaurants = (await viewModel.restaurantRepository.getAll()).length;
        const newOwnerRestaurants = (await viewModel.restaurantRepository.getOwnerRestaurants(loggedInOwner)).length;

        const isRestaurantSaved = restaurantSaved &&
            typeof restaurantSaved.id === 'number' &&
            restaurantSaved.name === createGoodFormRestaurantObject().name &&
            restaurantSaved.owner && restaurantSaved.owner.id === loggedInOwner.id;
        expect(isRestaurantSaved && newRestaurants === oldRestaurants+1 && newOwnerRestaurants === oldOwnerRestaurants+1 ).toBeTruthy();
    }
    else{
        const isBackendError = config.mock_disabled && viewModel.globalState.backendError !== undefined
        // eslint-disable-next-line jest/no-conditional-expect
        expect(isBackendError).toBeTruthy();
    }

});
