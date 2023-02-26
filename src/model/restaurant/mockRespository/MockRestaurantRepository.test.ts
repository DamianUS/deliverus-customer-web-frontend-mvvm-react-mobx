import MockRestaurantRepository from "./MockRestaurantRepository";
import Restaurant from "../Restaurant";
import RestaurantCategory from "../../restaurantCategory/RestaurantCategory";


test('getAll devuelve un array', () => {
    new MockRestaurantRepository()
    expect(Array.isArray(new MockRestaurantRepository().getAll())).toBeTruthy();
});

test('getAll devuelve un array no vacío', () => {
    expect(new MockRestaurantRepository().getAll().length > 0).toBeTruthy();
});

test('getAll devuelve un array de longitud 9', () => {
    expect(new MockRestaurantRepository().getAll().length === 9).toBeTruthy();
});

test('getAll devuelve un array de Restaurant', () => {
    const areAllRestaurants = new MockRestaurantRepository().getAll().map(restaurant => restaurant instanceof Restaurant).reduce((areAllRestaurants, isRestaurant) =>  areAllRestaurants && isRestaurant, true)
    expect(areAllRestaurants).toBeTruthy();
});

test('getAll devuelve un array de Restaurant que tienen restaurantCategories', () => {
    const areAllRestaurantCategories = new MockRestaurantRepository().getAll().map(restaurant => restaurant.category instanceof RestaurantCategory).reduce((areAllRestaurantCategories, isRestaurantCategory) =>  areAllRestaurantCategories && isRestaurantCategory, true)
    expect(areAllRestaurantCategories).toBeTruthy();
});

test('getAll devuelve un array de Restaurant que tienen createdAt y updatedAt como Date', () => {
    const areAllDates = new MockRestaurantRepository().getAll().map(restaurant => restaurant.createdAt instanceof Date && restaurant.updatedAt instanceof Date).reduce((areAllDates, areDates) =>  areAllDates && areDates, true)
    expect(areAllDates).toBeTruthy();
});

test('getAll devuelve un array de Restaurant que tienen restaurantCategories y todas ellas tienen createdAt y updatedAt como Date', () => {
    const areAllDates = new MockRestaurantRepository().getAll().map(restaurant => restaurant.category.createdAt instanceof Date && restaurant.category.updatedAt instanceof Date).reduce((areAllDates, areDates) =>  areAllDates && areDates, true)
    expect(areAllDates).toBeTruthy();
});
