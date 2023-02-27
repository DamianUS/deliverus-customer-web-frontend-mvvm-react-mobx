import MockRestaurantRepository from "./MockRestaurantRepository";
import Restaurant from "../Restaurant";
import RestaurantCategory from "../../restaurantCategory/RestaurantCategory";
import {convertToRestaurant, convertToObject} from "./MockRestaurantConversor";


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

const restaurantDatesAreDateIfPresent = (restaurant:Restaurant):boolean =>{
    const createdAtValid = restaurant.createdAt ? restaurant.createdAt instanceof Date : true
    const updatedAtValid = restaurant.updatedAt ? restaurant.updatedAt instanceof Date : true
    return createdAtValid && updatedAtValid
}

test('getAll devuelve un array de Restaurant que tienen createdAt y updatedAt como Date si existen', () => {
    const areAllDates = new MockRestaurantRepository().getAll()
        .map(restaurant => restaurantDatesAreDateIfPresent(restaurant))
        .reduce((areAllDates, areDates) =>  areAllDates && areDates, true)
    expect(areAllDates).toBeTruthy();
});

test('getAll devuelve un array de Restaurant que tienen restaurantCategories y todas ellas tienen createdAt y updatedAt como Date', () => {
    const areAllDates = new MockRestaurantRepository().getAll().map(restaurant => restaurant.category.createdAt instanceof Date && restaurant.category.updatedAt instanceof Date).reduce((areAllDates, areDates) =>  areAllDates && areDates, true)
    expect(areAllDates).toBeTruthy();
});

test('findById con id 2 devuelve algo definido', () => {
    const restaurant = new MockRestaurantRepository().getById(1)
    expect(restaurant).toBeDefined();
});

test('findById con id 10 devuelve null', () => {
    const restaurant = new MockRestaurantRepository().getById(10)
    expect(restaurant).toBeUndefined();
});

test('findById con id 1 devuelve algo un tipo Restaurant', () => {
    const restaurant = new MockRestaurantRepository().getById(1)
    expect(restaurant instanceof Restaurant).toBeTruthy();
});

test('findById con id 1 devuelve algo un tipo Restaurant que tiene restaurantCategory', () => {
    const restaurant = new MockRestaurantRepository().getById(1)
    expect(restaurant?.category instanceof RestaurantCategory).toBeTruthy();
});

test('findById con id 1 devuelve algo un tipo Restaurant que tiene createdAt y updatedAt como Date', () => {
    const restaurant = new MockRestaurantRepository().getById(1) ?? new Restaurant()
    expect(restaurantDatesAreDateIfPresent(restaurant)).toBeTruthy();
});

const _createMockRestaurant = ():Restaurant => {
    const restaurantObject = {
        "name": "Mocked restaurant",
        "description": "Cocina Tradicional",
        "address": "Av. Reina Mercedes 51, Sevilla",
        "postalCode": "41012",
        "url": "https://goo.gl/maps/GZEfzge4zXz6ySLR8",
        "shippingCosts": 2.5,
        "averageServiceMinutes": null,
        "email": "casafelix@restaurant.com",
        "phone": "954123123",
        "logo": "public/restaurants/casaFelixLogo.jpeg",
        "heroImage": null,
        "status": "closed",
        "restaurantCategoryId": 1,
        "restaurantCategory": {
            "id": 1,
            "name": "Spanish",
            "createdAt": "2023-02-26T20:17:10.000Z",
            "updatedAt": "2023-02-26T20:17:10.000Z"
        }
    }
    return convertToRestaurant(restaurantObject)
}

const _createMockRestaurantObject = ():object => {
    const newRestaurant = _createMockRestaurant()
    return convertToObject(newRestaurant)
}

test('save es capaz de utilizar un conversor para pasar de restaurant object a Restaurant', () => {
    const newRestaurant = _createMockRestaurant()
    expect(newRestaurant instanceof Restaurant).toBeTruthy();
});

test('save es capaz de utilizar un conversor para pasar de Restaurant a object', () => {
    const newRestaurant = _createMockRestaurant()
    const restaurantObject = convertToObject(newRestaurant)
    expect(typeof restaurantObject).toEqual('object');
});

test('save es capaz de utilizar un conversor para pasar de restaurant object a Restaurant que tiene restaurantCateogry con id 1', () => {
    const newRestaurant = _createMockRestaurant();
    expect(newRestaurant.category.id).toEqual(1);
});

test('save es capaz de incrementar la length del array a 10', () => {
    const repository = new MockRestaurantRepository()
    const newRestaurant = _createMockRestaurant()
    repository.save(newRestaurant)
    expect(repository.getAll().length).toEqual(10);
});

test('save introduce Restaurants con id numérico', () => {
    const repository = new MockRestaurantRepository()
    const newRestaurant = _createMockRestaurant()
    repository.save(newRestaurant)
    expect(repository.getAll().find(restaurant => typeof restaurant.id !== 'number')).toBeUndefined();
});

test('save introduce 6 elementos', () => {
    const repository = new MockRestaurantRepository()
    for (let i = 0; i < 6; i++) {
        const newRestaurant = _createMockRestaurant()
        repository.save(newRestaurant)
    }
    expect(repository.getAll().length).toEqual(15);
});

test('save modifica el restaurant 1 y le pone como nombre Mock restaurant', () => {
    const repository = new MockRestaurantRepository()
    const restaurant = repository.getById(1)
    if(restaurant){
        restaurant.name = 'Mock restaurant'
        repository.save(restaurant);
    }
    const updatedRestaurant = repository.getById(1)
    expect(updatedRestaurant?.name).toEqual('Mock restaurant');
});

test('removeById lanza un error si el id no existe', () => {
    const repository = new MockRestaurantRepository();
    expect(() => repository.removeById(-1)).toThrow();
});

test('removeById borra el id 1', () => {
    const repository = new MockRestaurantRepository();
    repository.removeById(1);
    expect(repository.getById(1)).toBeUndefined();
});

test('removeById reduce el length en 1 cuando borra', () => {
    const repository = new MockRestaurantRepository();
    const oldLength = repository.getAll().length
    repository.removeById(1)
    expect(repository.getAll().length).toEqual(oldLength-1);
});