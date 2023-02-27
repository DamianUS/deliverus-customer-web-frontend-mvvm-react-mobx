import IndexRestaurantsViewModel from "./IndexRestaurantsViewModel";
import Restaurant from "../../model/restaurant/Restaurant";
import * as dotenv from "dotenv";
import BackendServiceError from "../../model/errors/BackendServiceError";
dotenv.config()

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

test('IndexRestaurantViewModel recovers an array of length > 0 when page loads', () => {
    const viewModel = new IndexRestaurantsViewModel();
    viewModel.onPageLoad()
    expect(viewModel.restaurants.length).toBeGreaterThan(0);
});

test('IndexRestaurantViewModel recovers an array of restaurants when page loads', () => {
    const viewModel = new IndexRestaurantsViewModel();
    viewModel.onPageLoad()
    const areAllRestaurants = viewModel.restaurants.map(restaurant => restaurant instanceof Restaurant).reduce((areAllRestaurants, isRestaurant) =>  areAllRestaurants && isRestaurant, true)
    expect(areAllRestaurants).toBeTruthy();
});

test('IndexRestaurantViewModel backend error must be defined if something goes wrong on page load', () => {
    if(process.env.MOCK_REPOSITORY_STATUS !== "enabled"){
        const viewModel = new IndexRestaurantsViewModel();
        viewModel.onPageLoad()
        expect(viewModel.backendError).toBeDefined();
    }
});

test('IndexRestaurantViewModel backend error must be a BackendError if something goes wrong on page load', () => {
    if(process.env.MOCK_REPOSITORY_STATUS !== "enabled"){
        const viewModel = new IndexRestaurantsViewModel();
        viewModel.onPageLoad()
        expect(viewModel.backendError instanceof BackendServiceError).toBeTruthy();
    }
});