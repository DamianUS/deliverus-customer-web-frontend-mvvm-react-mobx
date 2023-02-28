import IndexRestaurantsViewModel from "./IndexRestaurantsViewModel";
import Restaurant from "../../model/restaurant/Restaurant";
import BackendServiceError from "../../model/errors/BackendServiceError";

test('IndexRestaurantViewModel gets a repository injected', () => {
    const viewModel = new IndexRestaurantsViewModel();
    expect(viewModel.restaurantRepository).toBeDefined();
});

test('IndexRestaurantViewModel has an empty array of restaurants at creation', () => {
    const viewModel = new IndexRestaurantsViewModel();
    expect(viewModel.restaurants).toEqual([]);
});

test('IndexRestaurantViewModel is not loading at creation', () => {
    const viewModel = new IndexRestaurantsViewModel();
    expect(viewModel.loading).toBeFalsy();
});

test('IndexRestaurantViewModel has no backend error at creation', () => {
    const viewModel = new IndexRestaurantsViewModel();
    expect(viewModel.backendError).toBeUndefined();
});

test('IndexRestaurantViewModel recovers an array of length > 0 when page loads', async () => {
    const viewModel = new IndexRestaurantsViewModel();
    await viewModel.onPageLoad()
    expect(viewModel.restaurants.length > 0 || viewModel.backendError instanceof BackendServiceError).toBeTruthy();
});

test('IndexRestaurantViewModel recovers an array of restaurants when page loads', async () => {
    const viewModel = new IndexRestaurantsViewModel();
    await viewModel.onPageLoad()
    const areAllRestaurants = viewModel.restaurants.map(restaurant => restaurant instanceof Restaurant).reduce((areAllRestaurants, isRestaurant) =>  areAllRestaurants && isRestaurant, true)
    expect(areAllRestaurants || viewModel.backendError instanceof BackendServiceError).toBeTruthy();
});
