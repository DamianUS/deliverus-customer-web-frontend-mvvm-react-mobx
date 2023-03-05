import OwnerRestaurantsViewModel from "./OwnerRestaurantsViewModel";
import User from "../../model/user/User";
import config from '../../config/config';
import MockUserRepository from "../../model/user/mockRepository/MockUserRepository";
import UserType from "../../model/user/UserType";
import Restaurant from "../../model/restaurant/Restaurant";
import CreateRestaurantViewModel from "./CreateRestaurantViewModel";

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
    const hasLoadedRestaurants = !config.mock_disabled && viewModel.restaurants && viewModel.restaurants.length === 1;
    const areAllRestaurants = !config.mock_disabled && viewModel.restaurants?.map(restaurant => restaurant instanceof Restaurant).reduce((areAllRestaurants, isRestaurant) =>  areAllRestaurants && isRestaurant, true)
    expect((hasLoadedRestaurants && areAllRestaurants) || isBackendError).toBeTruthy();
});
