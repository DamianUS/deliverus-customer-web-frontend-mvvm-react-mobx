import OwnerRestaurantsViewModel from "./OwnerRestaurantsViewModel";
import User from "../../model/models/user/User";
import config from '../../config/config';
import MockUserRepository from "../../model/repositories/mock/user/MockUserRepository";
import UserType from "../../model/models/user/UserType";
import Restaurant from "../../model/models/restaurant/Restaurant";
import CreateRestaurantViewModel from "./CreateRestaurantViewModel";
import MockRestaurantRepository from "../../model/repositories/mock/restaurant/MockRestaurantRepository";
import BackendServiceError from "../../model/errors/BackendServiceError";
import UnauthorizedError from "../../model/errors/UnauthorizedError";
import MockAuthenticationRepository from "../../model/repositories/mock/authentication/MockAuthenticationRepository";
import ForbiddenError from "../../model/errors/ForbiddenError";
import repository from "../../model/interfaces/Repository";
import globalState from "../GlobalState";

test('OwnerRestaurantsViewModel gets a repository injected', () => {
    const viewModel = new OwnerRestaurantsViewModel();
    expect(viewModel.restaurantRepository &&
        viewModel.globalState !== undefined &&
        viewModel.globalState.loading === false &&
        viewModel.globalState.backendError === undefined &&
        viewModel.globalState.loggedInUser === undefined
    ).toBeTruthy();
});

test('OwnerRestaurantsViewModel has an empty array of restaurants at creation', () => {
    const viewModel = new OwnerRestaurantsViewModel();
    expect(viewModel.restaurants).toEqual([]);
});

test('OwnerRestaurantsViewModel is loading when starts initializing', () => {
    const viewModel = new OwnerRestaurantsViewModel();
    viewModel.initialize()
    expect(viewModel.globalState.loading).toBeTruthy();
});

test('OwnerRestaurantsViewModel is not loading when starts initializing', async () => {
    const viewModel = new OwnerRestaurantsViewModel();
    await viewModel.initialize();
    expect(viewModel.globalState.loading).toBeFalsy();
});

test('OwnerRestaurant throws Authentication error at initialization when an empty user is provided', async () => {
    const viewModel = new OwnerRestaurantsViewModel();
    viewModel.globalState.loggedInUser = new User();
    await viewModel.initialize();
    const isBackendError = config.mock_disabled && viewModel.globalState.backendError !== undefined
    const isAuthorizationError = !config.mock_disabled && viewModel.globalState.authenticationError !== undefined
    expect(isBackendError || isAuthorizationError).toBeTruthy();
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

test('OwnerRestaurant throws Authentication error at initialization when an expired token is provided', async () => {
    const viewModel = new OwnerRestaurantsViewModel();
    // eslint-disable-next-line testing-library/no-await-sync-query
    viewModel.globalState.loggedInUser = mockExpiredUser();
    await viewModel.initialize();
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

test('OwnerRestaurant throws Forbidden error at initialization when an customer is provided', async () => {
    const viewModel = new OwnerRestaurantsViewModel();
    // eslint-disable-next-line testing-library/no-await-sync-query
    viewModel.globalState.loggedInUser = mockCustomer();
    await viewModel.initialize();
    const isBackendError = config.mock_disabled && viewModel.globalState.backendError !== undefined
    const isForbiddenError = !config.mock_disabled && viewModel.globalState.forbiddenError !== undefined
    expect(isBackendError || isForbiddenError).toBeTruthy();
});


test('OwnerRestaurantsViewModel recovers an array of Restaurants with length 1 when page loads', async () => {
    const viewModel = new OwnerRestaurantsViewModel();
    const userRepository = new MockUserRepository();
    // eslint-disable-next-line testing-library/no-await-sync-query
    viewModel.globalState.loggedInUser = await userRepository.getById(5);
    await viewModel.initialize();
    const isBackendError = config.mock_disabled && viewModel.globalState.backendError !== undefined;
    const hasLoadedRestaurants = !config.mock_disabled && viewModel.restaurants && viewModel.restaurants.length === 2;
    const areAllRestaurants = !config.mock_disabled && viewModel.restaurants?.map(restaurant => restaurant instanceof Restaurant).reduce((areAllRestaurants, isRestaurant) =>  areAllRestaurants && isRestaurant, true)
    expect((hasLoadedRestaurants && areAllRestaurants) || isBackendError).toBeTruthy();
});


test('Remove establece un authentication error sin usuario logeado', async () => {
    expect.assertions(1)
    const viewModel = new OwnerRestaurantsViewModel();
    await viewModel.initialize();
    // eslint-disable-next-line testing-library/no-await-sync-query
    await viewModel.remove((await viewModel.restaurantRepository.getById(1)) as Restaurant);
    const isBackendError = config.mock_disabled && viewModel.globalState.backendError !== undefined
    const isAuthorizationError = !config.mock_disabled && viewModel.globalState.authenticationError !== undefined
    expect(isBackendError || isAuthorizationError).toBeTruthy();
});

test('Remove establece un forbidden error con customer logeado', async () => {
    expect.assertions(1)
    const viewModel = new OwnerRestaurantsViewModel();
    const authenticationRepository = new MockAuthenticationRepository();
    viewModel.globalState.loggedInUser = await authenticationRepository.login('customer1@customer.com', 'secret');
    await viewModel.initialize();
    // eslint-disable-next-line testing-library/no-await-sync-query
    await viewModel.remove((await viewModel.restaurantRepository.getById(1)) as Restaurant);
    const isBackendError = config.mock_disabled && viewModel.globalState.backendError !== undefined
    const isForbiddenError = !config.mock_disabled && viewModel.globalState.forbiddenError !== undefined
    expect(isBackendError || isForbiddenError).toBeTruthy();
});

test('Remove establece un forbidden error cuando un owner intenta borrar el restaurante de otro owner', async () => {
    expect.assertions(1)
    const viewModel = new OwnerRestaurantsViewModel();
    const authenticationRepository = new MockAuthenticationRepository();
    viewModel.globalState.loggedInUser = await authenticationRepository.login('owner1@owner.com', 'secret');
    await viewModel.initialize();
    // eslint-disable-next-line testing-library/no-await-sync-query
    await viewModel.remove((await viewModel.restaurantRepository.getById(1)) as Restaurant);
    const isBackendError = config.mock_disabled && viewModel.globalState.backendError !== undefined
    const isForbiddenError = !config.mock_disabled && viewModel.globalState.forbiddenError !== undefined
    expect(isBackendError || isForbiddenError).toBeTruthy();
});

test('Remove reduce el length en 1 cuando borra un restaurante propio', async () => {
    expect.assertions(1)
    const viewModel = new OwnerRestaurantsViewModel();
    const authenticationRepository = new MockAuthenticationRepository();
    viewModel.globalState.loggedInUser = await authenticationRepository.login('owner2@owner.com', 'secret');
    await viewModel.initialize();
    const oldLength = viewModel.restaurants.length;
    // eslint-disable-next-line testing-library/no-await-sync-query
    await viewModel.remove((await viewModel.restaurantRepository.getById(5)) as Restaurant);
    const newLength = viewModel.restaurants.length
    const isBackendError = config.mock_disabled && viewModel.globalState.backendError !== undefined
    const hasRemoved = !config.mock_disabled && (Math.max(0,oldLength-1) === newLength)
    expect(isBackendError || hasRemoved).toBeTruthy();
});
