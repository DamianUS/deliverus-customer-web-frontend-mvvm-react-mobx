import MockRestaurantRepository from "./MockRestaurantRepository";
import Restaurant from "../Restaurant";
import RestaurantCategory from "../../restaurantCategory/RestaurantCategory";
import {convertToRestaurant, convertToObject} from "./MockRestaurantConversor";
import config from "../../../config/config";
import exp from "constants";
import BackendServiceError from "../../errors/BackendServiceError";
// @ts-ignore

test('getAll devuelve un array o un BackendServiceError if mocking service is disabled', async () => {
    try{
        const restaurants = await new MockRestaurantRepository().getAll()
        expect(Array.isArray(restaurants)).toBeTruthy();
    }
    catch(error){
        expect(error instanceof BackendServiceError).toEqual(config.mock_disabled);
    }
});

test('getAll devuelve un array no vacío o un BackendServiceError if mocking service is disabled', async () => {
    try{
        const restaurants = await new MockRestaurantRepository().getAll()
        expect(restaurants.length > 0).toBeTruthy();
    }
    catch(error){
        expect(error instanceof BackendServiceError).toEqual(config.mock_disabled);
    }
});

test('getAll devuelve un array de longitud 9', async () => {
    try{
        const restaurants = await new MockRestaurantRepository().getAll()
        expect(restaurants.length === 9).toBeTruthy();
    }
    catch(error){
        expect(error instanceof BackendServiceError).toEqual(config.mock_disabled);
    }
});

test('getAll devuelve un array de Restaurant', async () => {
    try{
        const restaurants = await new MockRestaurantRepository().getAll()
        const areAllRestaurants = restaurants.map(restaurant => restaurant instanceof Restaurant).reduce((areAllRestaurants, isRestaurant) =>  areAllRestaurants && isRestaurant, true)
        expect(areAllRestaurants).toBeTruthy();
    }
    catch(error){
        expect(error instanceof BackendServiceError).toEqual(config.mock_disabled);
    }
});

test('getAll devuelve un array de Restaurant que tienen restaurantCategories', async () => {
    try {
        const restaurants = await new MockRestaurantRepository().getAll()
        const areAllRestaurantCategories = restaurants.map(restaurant => restaurant.category instanceof RestaurantCategory).reduce((areAllRestaurantCategories, isRestaurantCategory) => areAllRestaurantCategories && isRestaurantCategory, true)
        expect(areAllRestaurantCategories).toBeTruthy();
    }
    catch(error){
        expect(error instanceof BackendServiceError).toEqual(config.mock_disabled);
    }
});

const restaurantDatesAreDateIfPresent = (restaurant:Restaurant):boolean =>{
    const createdAtValid = restaurant.createdAt ? restaurant.createdAt instanceof Date : true
    const updatedAtValid = restaurant.updatedAt ? restaurant.updatedAt instanceof Date : true
    return createdAtValid && updatedAtValid
}

test('getAll devuelve un array de Restaurant que tienen createdAt y updatedAt como Date si existen', async () => {
    try{
        const restaurants = await new MockRestaurantRepository().getAll();
        const areAllDates = restaurants
            .map(restaurant => restaurantDatesAreDateIfPresent(restaurant))
            .reduce((areAllDates, areDates) =>  areAllDates && areDates, true)
        expect(areAllDates).toBeTruthy();
    }
    catch(error){
        expect(error instanceof BackendServiceError).toEqual(config.mock_disabled);
    }
});

test('getAll devuelve un array de Restaurant que tienen restaurantCategories y todas ellas tienen createdAt y updatedAt como Date', async () => {
    try {
        const restaurants = await new MockRestaurantRepository().getAll()
        const areAllDates = restaurants.map(restaurant => restaurant.category.createdAt instanceof Date && restaurant.category.updatedAt instanceof Date).reduce((areAllDates, areDates) => areAllDates && areDates, true)
        expect(areAllDates).toBeTruthy();
    }
    catch(error){
        expect(error instanceof BackendServiceError).toEqual(config.mock_disabled);
    }
});

test('findById con id 2 devuelve algo definido', async () => {
    try {
        const restaurant = await new MockRestaurantRepository().getById(1)
        expect(restaurant).toBeDefined();
    }
    catch(error){
        expect(error instanceof BackendServiceError).toEqual(config.mock_disabled);
    }
});

test('findById con id 10 devuelve null', async () => {
    try {
        const restaurant = await new MockRestaurantRepository().getById(10)
        expect(restaurant).toBeUndefined();
    }
    catch(error){
        expect(error instanceof BackendServiceError).toEqual(config.mock_disabled);
    }
});

test('findById con id 1 devuelve algo un tipo Restaurant', async () => {
    try {
        const restaurant = await new MockRestaurantRepository().getById(1)
        expect(restaurant instanceof Restaurant).toBeTruthy();
    }
    catch(error){
        expect(error instanceof BackendServiceError).toEqual(config.mock_disabled);
    }
});

test('findById con id 1 devuelve algo un tipo Restaurant que tiene restaurantCategory', async () => {
    try {
        const restaurant = await new MockRestaurantRepository().getById(1)
        expect(restaurant?.category instanceof RestaurantCategory).toBeTruthy();
    }
    catch(error){
        expect(error instanceof BackendServiceError).toEqual(config.mock_disabled);
    }
});

test('findById con id 1 devuelve algo un tipo Restaurant que tiene createdAt y updatedAt como Date', async () => {
    try{
        const repository = new MockRestaurantRepository()
        const restaurant = await repository.getById(1) ?? new Restaurant()
        expect(restaurantDatesAreDateIfPresent(restaurant)).toBeTruthy();
    }
    catch(error){
        expect(error instanceof BackendServiceError).toEqual(config.mock_disabled);
    }
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
    // @ts-ignore
    const newRestaurant = _createMockRestaurant()
    expect(newRestaurant instanceof Restaurant).toBeTruthy();
});

test('save es capaz de utilizar un conversor para pasar de Restaurant a object',() => {
    const newRestaurant = _createMockRestaurant()
    const restaurantObject = convertToObject(newRestaurant)
    expect(typeof restaurantObject).toEqual('object');
});

test('save es capaz de utilizar un conversor para pasar de restaurant object a Restaurant que tiene restaurantCateogry con id 1',() => {
    const newRestaurant = _createMockRestaurant();
    expect(newRestaurant.category.id).toEqual(1);
});

test('save es capaz de incrementar la length del array a 10', async () => {
    try {
        const repository = new MockRestaurantRepository()
        const newRestaurant = _createMockRestaurant()
        await repository.save(newRestaurant)
        const restaurants = await repository.getAll()
        expect(restaurants.length).toEqual(10);
    }
    catch(error){
        expect(error instanceof BackendServiceError).toEqual(config.mock_disabled);
    }
});

test('save introduce Restaurants con id numérico', async () => {
    try{
        const repository = new MockRestaurantRepository()
        const newRestaurant = _createMockRestaurant()
        await repository.save(newRestaurant)
        const restaurants = await repository.getAll()
        expect(restaurants.find(restaurant => typeof restaurant.id !== 'number')).toBeUndefined();
    }
    catch(error){
        expect(error instanceof BackendServiceError).toEqual(config.mock_disabled);
    }
});

test('save introduce 6 elementos', async () => {
    const repository = new MockRestaurantRepository()
    // @ts-ignore
    const insertionPromises = [...Array(6).keys()].map(_ => {
        const newRestaurant = _createMockRestaurant()
        return repository.save(newRestaurant)
    })
    try{
        await Promise.all(insertionPromises);
        const restaurants = await repository.getAll()
        expect(restaurants.length).toEqual(15);
    }
    catch(error){
        expect(error instanceof BackendServiceError).toEqual(config.mock_disabled);
    }
});

test('save modifica el restaurant 1 y le pone como nombre Mock restaurant', async () => {
    try{
        const repository = new MockRestaurantRepository()
        const restaurant = await repository.getById(1)
        if(restaurant){
            restaurant.name = 'Mock restaurant'
            await repository.save(restaurant);
        }
        const updatedRestaurant = await repository.getById(1)
        expect(updatedRestaurant?.name).toEqual('Mock restaurant');
    }
    catch(error){
        expect(error instanceof BackendServiceError).toEqual(config.mock_disabled);
    }
});

test('removeById devuelve 0 si el id no existe', async () => {
    try{
        const repository = new MockRestaurantRepository();
        expect(await repository.removeById(-1)).toEqual(0);
    }
    catch(error){
        expect(error instanceof BackendServiceError).toEqual(config.mock_disabled);
    }
});

test('removeById borra el id 1', async () => {
    const repository = new MockRestaurantRepository();
    try{
        await repository.removeById(1);
        expect(await repository.getById(1)).toBeUndefined();
    }
    catch(error){
        expect(error instanceof BackendServiceError).toEqual(config.mock_disabled);
    }
});

test('removeById reduce el length en 1 cuando borra', async () => {
    try {
        const repository = new MockRestaurantRepository();
        const oldRestaurants = await repository.getAll()
        const oldLength = oldRestaurants.length
        await repository.removeById(1)
        const restaurants = await repository.getAll()
        expect(restaurants.length).toEqual(oldLength - 1);
    }
    catch(error){
        expect(error instanceof BackendServiceError).toEqual(config.mock_disabled);
    }
});
