/* eslint-disable jest/no-conditional-expect */
import MockRestaurantRepository from "./MockRestaurantRepository";
import Restaurant from "../Restaurant";
import RestaurantCategory from "../../restaurantCategory/RestaurantCategory";
import config from "../../../config/config";
import BackendServiceError from "../../errors/BackendServiceError";
import MockRestaurantConversor from "./MockRestaurantConversor";
import User from "../../user/User";
import UnauthorizedError from "../../errors/UnauthorizedError";
import MockUserRepository from "../../user/mockRepository/MockUserRepository";
import MockAuthenticationRepository from "../../authentication/MockAuthenticationRepository";
import ForbiddenError from "../../errors/ForbiddenError";
import restaurantsMocked from "./restaurants.json";

// @ts-ignore

test('getAll devuelve un array o un BackendServiceError if mocking service is disabled', async () => {
    expect.assertions(1)
    try{
        const restaurants = await new MockRestaurantRepository().getAll()
        expect(Array.isArray(restaurants)).toBeTruthy();
    }
    catch(error){
        expect(config.mock_disabled && error instanceof BackendServiceError).toBeTruthy();
    }
});

test('getAll devuelve un array no vacío o un BackendServiceError if mocking service is disabled', async () => {
    expect.assertions(1)
    try{
        const restaurants = await new MockRestaurantRepository().getAll()
        expect(restaurants.length > 0).toBeTruthy();
    }
    catch(error){
        expect(config.mock_disabled && error instanceof BackendServiceError).toBeTruthy();
    }
});

test('getAll devuelve un array de longitud correcta', async () => {
    expect.assertions(1)
    try{
        const restaurants = await new MockRestaurantRepository().getAll()
        expect(restaurants.length === restaurantsMocked.length).toBeTruthy();
    }
    catch(error){
        expect(config.mock_disabled && error instanceof BackendServiceError).toBeTruthy();
    }
});

test('getAll devuelve un array de Restaurant', async () => {
    expect.assertions(1)
    try{
        const restaurants = await new MockRestaurantRepository().getAll()
        const areAllRestaurants = restaurants.map(restaurant => restaurant instanceof Restaurant).reduce((areAllRestaurants, isRestaurant) =>  areAllRestaurants && isRestaurant, true)
        expect(areAllRestaurants).toBeTruthy();
    }
    catch(error){
        expect(config.mock_disabled && error instanceof BackendServiceError).toBeTruthy();
    }
});

test('getAll devuelve un array de Restaurant que tienen restaurantCategories', async () => {
    expect.assertions(1)
    try {
        const restaurants = await new MockRestaurantRepository().getAll()
        const areAllRestaurantCategories = restaurants.map(restaurant => restaurant.category instanceof RestaurantCategory).reduce((areAllRestaurantCategories, isRestaurantCategory) => areAllRestaurantCategories && isRestaurantCategory, true)
        expect(areAllRestaurantCategories).toBeTruthy();
    }
    catch(error){
        expect(config.mock_disabled && error instanceof BackendServiceError).toBeTruthy();
    }
});

const restaurantDatesAreDateIfPresent = (restaurant:Restaurant):boolean =>{
    const createdAtValid = restaurant.createdAt ? restaurant.createdAt instanceof Date : true
    const updatedAtValid = restaurant.updatedAt ? restaurant.updatedAt instanceof Date : true
    return createdAtValid && updatedAtValid
}

test('getAll devuelve un array de Restaurant que tienen createdAt y updatedAt como Date si existen', async () => {
    expect.assertions(1)
    try{
        const restaurants = await new MockRestaurantRepository().getAll();
        const areAllDates = restaurants
            .map(restaurant => restaurantDatesAreDateIfPresent(restaurant))
            .reduce((areAllDates, areDates) =>  areAllDates && areDates, true)
        expect(areAllDates).toBeTruthy();
    }
    catch(error){
        expect(config.mock_disabled && error instanceof BackendServiceError).toBeTruthy();
    }
});

test('getAll devuelve un array de Restaurant que tienen restaurantCategories y todas ellas tienen createdAt y updatedAt como Date', async () => {
    expect.assertions(1)
    try {
        const restaurants = await new MockRestaurantRepository().getAll()
        const areAllDates = restaurants.map(restaurant => restaurant.category.createdAt instanceof Date && restaurant.category.updatedAt instanceof Date).reduce((areAllDates, areDates) => areAllDates && areDates, true)
        expect(areAllDates).toBeTruthy();
    }
    catch(error){
        expect(config.mock_disabled && error instanceof BackendServiceError).toBeTruthy();
    }
});

test('getAll devuelve un array de Restaurant que tienen owner de tipo user', async () => {
    expect.assertions(1)
    try {
        const restaurants = await new MockRestaurantRepository().getAll()
        const areAllUsers = restaurants.map(restaurant => restaurant.owner !== undefined && restaurant.owner instanceof User).reduce((areAllUsers, areUsers) => areAllUsers && areUsers, true)
        expect(areAllUsers).toBeTruthy();
    }
    catch(error){
        expect(config.mock_disabled && error instanceof BackendServiceError).toBeTruthy();
    }
});

test('findById con id 2 devuelve algo definido', async () => {
    expect.assertions(1)
    try {
        // eslint-disable-next-line testing-library/no-await-sync-query
        const restaurant = await new MockRestaurantRepository().getById(1)
        expect(restaurant).toBeDefined();
    }
    catch(error){
        expect(config.mock_disabled && error instanceof BackendServiceError).toBeTruthy();
    }
});

test('findById con id 10 devuelve null', async () => {
    expect.assertions(1)
    try {
        // eslint-disable-next-line testing-library/no-await-sync-query
        const restaurant = await new MockRestaurantRepository().getById(10)
        expect(restaurant).toBeUndefined();
    }
    catch(error){
        expect(config.mock_disabled && error instanceof BackendServiceError).toBeTruthy();
    }
});

test('findById con id 1 devuelve algo un tipo Restaurant', async () => {
    expect.assertions(1)
    try {
        // eslint-disable-next-line testing-library/no-await-sync-query
        const restaurant = await new MockRestaurantRepository().getById(1)
        expect(restaurant instanceof Restaurant).toBeTruthy();
    }
    catch(error){
        expect(config.mock_disabled && error instanceof BackendServiceError).toBeTruthy();
    }
});

test('findById con id 1 devuelve algo un tipo Restaurant que tiene restaurantCategory', async () => {
    expect.assertions(1)
    try {
        // eslint-disable-next-line testing-library/no-await-sync-query
        const restaurant = await new MockRestaurantRepository().getById(1)
        expect(restaurant?.category instanceof RestaurantCategory).toBeTruthy();
    }
    catch(error){
        expect(config.mock_disabled && error instanceof BackendServiceError).toBeTruthy();
    }
});

test('findById con id 1 devuelve algo un tipo Restaurant que tiene createdAt y updatedAt como Date', async () => {
    expect.assertions(1)
    try{
        const repository = new MockRestaurantRepository()
        // eslint-disable-next-line testing-library/no-await-sync-query
        const restaurant = await repository.getById(1) ?? new Restaurant()
        expect(restaurantDatesAreDateIfPresent(restaurant)).toBeTruthy();
    }
    catch(error){
        expect(config.mock_disabled && error instanceof BackendServiceError).toBeTruthy();
    }
});


test('findById con id 3 devuelve un tipo Restaurant con el logo undefined', async () => {
    expect.assertions(1)
    try {
        // eslint-disable-next-line testing-library/no-await-sync-query
        const restaurant = await new MockRestaurantRepository().getById(3)
        expect(restaurant?.logo).toBeUndefined();
    }
    catch(error){
        expect(config.mock_disabled && error instanceof BackendServiceError).toBeTruthy();
    }
});

const _createMockRestaurant = ():Promise<Restaurant> => {
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
    return new MockRestaurantConversor().convertToInternalEntity(restaurantObject)
}

test('save es capaz de utilizar un conversor para pasar de restaurant object a Restaurant', async () => {
    // @ts-ignore
    const newRestaurant = await _createMockRestaurant()
    expect(newRestaurant instanceof Restaurant).toBeTruthy();
});

test('save es capaz de utilizar un conversor para pasar de Restaurant a object',async () => {
    const newRestaurant = await _createMockRestaurant()
    const restaurantObject = new MockRestaurantConversor().convertToExternalObject(newRestaurant)
    expect(typeof restaurantObject).toEqual('object');
});

test('save es capaz de utilizar un conversor para pasar de restaurant object a Restaurant que tiene restaurantCateogry con id 1',async () => {
    const newRestaurant = await _createMockRestaurant();
    expect(newRestaurant.category.id).toEqual(1);
});

test('save es capaz de incrementar la length del array a 10', async () => {
    expect.assertions(1)
    try {
        const repository = new MockRestaurantRepository()
        const newRestaurant = await _createMockRestaurant()
        await repository.save(newRestaurant)
        const restaurants = await repository.getAll()
        expect(restaurants.length).toEqual(10);
    }
    catch(error){
        expect(config.mock_disabled && error instanceof BackendServiceError).toBeTruthy();
    }
});

test('save introduce Restaurants con id numérico', async () => {
    expect.assertions(1)
    try{
        const repository = new MockRestaurantRepository()
        const newRestaurant = await _createMockRestaurant()
        await repository.save(newRestaurant)
        const restaurants = await repository.getAll()
        expect(restaurants.find(restaurant => typeof restaurant.id !== 'number')).toBeUndefined();
    }
    catch(error){
        expect(config.mock_disabled && error instanceof BackendServiceError).toBeTruthy();
    }
});

test('save introduce 6 elementos', async () => {
    expect.assertions(1)
    const repository = new MockRestaurantRepository()
    // @ts-ignore
    const creationPromises = [...Array(6).keys()].map(_ => {
        return _createMockRestaurant()
    })
    const entities = await Promise.all(creationPromises);
    // @ts-ignore
    const insertionPromises = entities.map(entity => {
        return repository.save(entity)
    })
    try{
        await Promise.all(insertionPromises);
        const restaurants = await repository.getAll()
        expect(restaurants.length).toEqual(restaurantsMocked.length+6);
    }
    catch(error){
        expect(config.mock_disabled && error instanceof BackendServiceError).toBeTruthy();
    }
});

test('save modifica el restaurant 1 y le pone como nombre Mock restaurant', async () => {
    expect.assertions(1)
    try{
        const repository = new MockRestaurantRepository()
        // eslint-disable-next-line testing-library/no-await-sync-query
        const restaurant = await repository.getById(1)
        if(restaurant){
            restaurant.name = 'Mock restaurant'
            await repository.save(restaurant);
        }
        // eslint-disable-next-line testing-library/no-await-sync-query
        const updatedRestaurant = await repository.getById(1)
        expect(updatedRestaurant?.name).toEqual('Mock restaurant');
    }
    catch(error){
        expect(config.mock_disabled && error instanceof BackendServiceError).toBeTruthy();
    }
});

test('removeById devuelve 0 si el id no existe', async () => {
    expect.assertions(1)
    try{
        const repository = new MockRestaurantRepository();
        expect(await repository.removeById(-1)).toEqual(0);
    }
    catch(error){
        expect(config.mock_disabled && error instanceof BackendServiceError).toBeTruthy();
    }
});

test('removeById borra el id 1', async () => {
    expect.assertions(1)
    const repository = new MockRestaurantRepository();
    try{
        await repository.removeById(1);
        // eslint-disable-next-line testing-library/no-await-sync-query
        expect(await repository.getById(1)).toBeUndefined();
    }
    catch(error){
        expect(config.mock_disabled && error instanceof BackendServiceError).toBeTruthy();
    }
});

test('removeById reduce el length en 1 cuando borra', async () => {
    expect.assertions(1)
    try {
        const repository = new MockRestaurantRepository();
        const oldRestaurants = await repository.getAll()
        const oldLength = oldRestaurants.length
        await repository.removeById(1)
        const restaurants = await repository.getAll()
        expect(restaurants.length).toEqual(oldLength - 1);
    }
    catch(error){
        expect(config.mock_disabled && error instanceof BackendServiceError).toBeTruthy();
    }
});

test('getOwnerRestaurants devuelve UnauthorizedError con usuario vacío', async () => {
    expect.assertions(1)
    const repository = new MockRestaurantRepository();
    try{
        const restaurants = await repository.getOwnerRestaurants(new User());
        // eslint-disable-next-line testing-library/no-await-sync-query
        expect(restaurants).toBeUndefined();
    }
    catch(error){
        expect(error instanceof UnauthorizedError).toBeTruthy();
    }
});

test('getOwnerRestaurants devuelve UnauthorizedError con usuario Owner sin logear', async () => {
    expect.assertions(1)
    const repository = new MockRestaurantRepository();
    const userRepository = new MockUserRepository();
    try{
        // eslint-disable-next-line testing-library/no-await-sync-query
        const user = await userRepository.getByEmailAndPassword('owner1@owner.com', 'secret') as User;
        const restaurants = await repository.getOwnerRestaurants(user);
        // eslint-disable-next-line testing-library/no-await-sync-query
        expect(restaurants).toBeUndefined();
    }
    catch(error) {
        expect(config.mock_disabled ? error instanceof BackendServiceError : error instanceof UnauthorizedError).toBeTruthy();
    }
});

test('getOwnerRestaurants devuelve UnauthorizedError con usuario Owner con token pero fecha expirada', async () => {
    const repository = new MockRestaurantRepository();
    const authRepository = new MockAuthenticationRepository();
    try{
        expect.assertions(1)
        // eslint-disable-next-line testing-library/no-await-sync-query
        const user = await authRepository.login('owner1@owner.com', 'secret') as User;
        const pastDate = new Date(new Date().getTime() - 30*60000);
        user.tokenExpiration = pastDate
        const restaurants = await repository.getOwnerRestaurants(user);
        // eslint-disable-next-line testing-library/no-await-sync-query
        expect(restaurants).toBeUndefined();
    }
    catch(error){
        expect(config.mock_disabled ? error instanceof BackendServiceError : error instanceof UnauthorizedError).toBeTruthy();
    }
});

test('getOwnerRestaurants devuelve Forbidden error con usuario Customer logeado', async () => {
    const repository = new MockRestaurantRepository();
    const authRepository = new MockAuthenticationRepository();
    try{
        expect.assertions(1)
        // eslint-disable-next-line testing-library/no-await-sync-query
        const user = await authRepository.login('customer1@customer.com', 'secret') as User;
        const restaurants = await repository.getOwnerRestaurants(user);
        // eslint-disable-next-line testing-library/no-await-sync-query
        expect(restaurants).toBeUndefined();
    }
    catch(error){
        const hola = error instanceof ForbiddenError;
        expect(config.mock_disabled ? error instanceof BackendServiceError : error instanceof ForbiddenError).toBeTruthy();
    }
});

test('getOwnerRestaurants devuelve una lista de Restaurant con Owner logeado o BackendServiceError', async () => {
    expect.assertions(1)
    const repository = new MockRestaurantRepository();
    const authRepository = new MockAuthenticationRepository();
    try{
        // eslint-disable-next-line testing-library/no-await-sync-query
        const user = await authRepository.login('owner1@owner.com', 'secret') as User;
        const restaurants = await repository.getOwnerRestaurants(user);
        // eslint-disable-next-line testing-library/no-await-sync-query
        const areAllRestaurants = restaurants.map(restaurant => restaurant instanceof Restaurant).reduce((areAllRestaurants, isRestaurant) =>  areAllRestaurants && isRestaurant, true)
        expect(areAllRestaurants).toBeTruthy();
    }
    catch(error){
        expect(config.mock_disabled && error instanceof BackendServiceError).toBeTruthy();
    }
});
