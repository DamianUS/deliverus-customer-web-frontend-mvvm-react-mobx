import IndexRestaurantsViewModel from "./IndexRestaurantsViewModel";
import Restaurant from "../../model/restaurant/Restaurant";
import BackendServiceError from "../../model/errors/BackendServiceError";
import GlobalState from "../GlobalState";
import OwnerRestaurantsViewModel from "./OwnerRestaurantsViewModel";

test('OwnerRestaurantsViewModel gets a repository injected', () => {
    const viewModel = new OwnerRestaurantsViewModel();
    expect(viewModel.restaurantRepository).toBeDefined();
});

test('OwnerRestaurantsViewModel has an empty array of restaurants at creation', () => {
    const viewModel = new OwnerRestaurantsViewModel();
    expect(viewModel.restaurants).toEqual([]);
});

test('OwnerRestaurantsViewModel is not loading at creation', () => {
    const viewModel = new IndexRestaurantsViewModel();
    expect(viewModel.globalState.loading).toBeFalsy();
});

test('OwnerRestaurantsViewModel has no backend error at creation', () => {
    const viewModel = new IndexRestaurantsViewModel();
    expect(viewModel.globalState.backendError).toBeUndefined();
});

test('OwnerRestaurantsViewModel has no backend error at creation', () => {
    const viewModel = new IndexRestaurantsViewModel();
    expect(viewModel.globalState.backendError).toBeUndefined();
});

/*
test('IndexRestaurantViewModel recovers an array of length > 0 when page loads', async () => {
    const viewModel = new IndexRestaurantsViewModel();
    await viewModel.initialize()
    expect(viewModel.restaurants.length > 0 || viewModel.globalState.backendError instanceof BackendServiceError).toBeTruthy();
});

test('IndexRestaurantViewModel recovers an array of restaurants when page loads', async () => {
    const viewModel = new IndexRestaurantsViewModel();
    await viewModel.initialize()
    const areAllRestaurants = viewModel.restaurants.map(restaurant => restaurant instanceof Restaurant).reduce((areAllRestaurants, isRestaurant) =>  areAllRestaurants && isRestaurant, true)
    expect(areAllRestaurants || viewModel.globalState.backendError instanceof BackendServiceError).toBeTruthy();
});

test('IndexRestaurantViewModel gets a GlobalState injected', () => {
    const viewModel = new IndexRestaurantsViewModel();
    expect(viewModel.globalState).toBeDefined();
});

test('IndexRestaurantViewModel initial globalState loading is false', () => {
    const viewModel = new IndexRestaurantsViewModel();
    expect(viewModel.globalState.loading).toBeFalsy();
});

test('IndexRestaurantViewModel initial backendError is false', () => {
    const viewModel = new IndexRestaurantsViewModel();
    viewModel.globalState = new GlobalState();
    expect(viewModel.globalState.backendError).toBeUndefined();
});

test('GlobalState is loading when IndexRestaurantViewModel starts initializing', () => {
    const viewModel = new IndexRestaurantsViewModel();
    viewModel.initialize()
    expect(viewModel.globalState.loading).toBeTruthy();
});

test('GlobalState is not loading when IndexRestaurantViewModel ends initializing', async () => {
    const viewModel = new IndexRestaurantsViewModel();
    await viewModel.initialize()
    expect(viewModel.globalState.loading).toBeFalsy();
});

test('GlobalState is either of undefined when IndexRestaurantViewModel ends initializing', async () => {
    const viewModel = new IndexRestaurantsViewModel();
    await viewModel.initialize()
    expect(viewModel.globalState.backendError === undefined || viewModel.globalState.backendError instanceof BackendServiceError).toBeTruthy();
});
*/
