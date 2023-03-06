/* eslint-disable jest/no-conditional-expect */
import MockRestaurantCategoryRepository from "./MockRestaurantCategoryRepository";
import RestaurantCategory from "../../../models/restaurantCategory/RestaurantCategory";
import config from "../../../../config/config";
import BackendServiceError from "../../../errors/BackendServiceError";
import MockRestaurantCategoryConversor from "./MockRestaurantCategoryConversor";
import restaurantCategoriesMocked from "./restaurantCategories.json";



const conversor = new MockRestaurantCategoryConversor()
const collectionLength = restaurantCategoriesMocked.length

test('getAll devuelve un array o un BackendServiceError if mocking service is disabled', async () => {
    expect.assertions(1)
    try{
        const entities = await new MockRestaurantCategoryRepository().getAll()
        expect(Array.isArray(entities)).toBeTruthy();
    }
    catch(error){
        expect(config.mock_disabled && error instanceof BackendServiceError).toBeTruthy();
    }
});

test('getAll devuelve un array no vacío o un BackendServiceError if mocking service is disabled', async () => {
    expect.assertions(1)
    try{
        const entities = await new MockRestaurantCategoryRepository().getAll()
        expect(entities.length > 0).toBeTruthy();
    }
    catch(error){
        expect(config.mock_disabled && error instanceof BackendServiceError).toBeTruthy();
    }
});

test(`getAll devuelve un array de longitud ${collectionLength}`, async () => {
    expect.assertions(1)
    try{
        const entities = await new MockRestaurantCategoryRepository().getAll()
        expect(entities.length === collectionLength).toBeTruthy();
    }
    catch(error){
        expect(config.mock_disabled && error instanceof BackendServiceError).toBeTruthy();
    }
});

test('getAll devuelve un array de RestaurantCategory', async () => {
    expect.assertions(1)
    try{
        const entities = await new MockRestaurantCategoryRepository().getAll()
        const areAllEntities = entities.map(restaurant => restaurant instanceof RestaurantCategory).reduce((areAllEntities, isRestaurant) =>  areAllEntities && isRestaurant, true)
        expect(areAllEntities).toBeTruthy();
    }
    catch(error){
        expect(config.mock_disabled && error instanceof BackendServiceError).toBeTruthy();
    }
});

test('getAll devuelve un array de Restaurant que tienen id numérico', async () => {
    expect.assertions(1)
    try {
        const entities = await new MockRestaurantCategoryRepository().getAll()
        const allHaveNumericIds = entities.map(restaurantCategory => typeof restaurantCategory.id === 'number').reduce((areAllIdsNumeric, isNumeric) => areAllIdsNumeric && isNumeric, true)
        expect(allHaveNumericIds).toBeTruthy();
    }
    catch(error){
        expect(config.mock_disabled && error instanceof BackendServiceError).toBeTruthy();
    }
});

const entityDatesAreDateIfPresent = (entity:RestaurantCategory):boolean =>{
    const createdAtValid = entity.createdAt ? entity.createdAt instanceof Date : true
    const updatedAtValid = entity.updatedAt ? entity.updatedAt instanceof Date : true
    return createdAtValid && updatedAtValid
}

test('getAll devuelve un array de RestaurantCategory que tienen createdAt y updatedAt como Date si existen', async () => {
    expect.assertions(1)
    try{
        const entities = await new MockRestaurantCategoryRepository().getAll();
        const areAllDates = entities
            .map(entity => entityDatesAreDateIfPresent(entity))
            .reduce((areAllDates, areDates) =>  areAllDates && areDates, true)
        expect(areAllDates).toBeTruthy();
    }
    catch(error){
        expect(config.mock_disabled && error instanceof BackendServiceError).toBeTruthy();
    }
});

test('findById con id 2 devuelve algo definido', async () => {
    expect.assertions(1)
    try {
        // eslint-disable-next-line testing-library/no-await-sync-query
        const entity = await new MockRestaurantCategoryRepository().getById(1)
        expect(entity).toBeDefined();
    }
    catch(error){
        expect(config.mock_disabled && error instanceof BackendServiceError).toBeTruthy();
    }
});

test('findById con id 10 devuelve undefined', async () => {
    expect.assertions(1)
    try {
        // eslint-disable-next-line testing-library/no-await-sync-query
        const entity = await new MockRestaurantCategoryRepository().getById(10)
        expect(entity).toBeUndefined();
    }
    catch(error){
        expect(config.mock_disabled && error instanceof BackendServiceError).toBeTruthy();
    }
});

test('findById con id 1 devuelve algo un tipo RestaurantCategory', async () => {
    expect.assertions(1)
    try {
        // eslint-disable-next-line testing-library/no-await-sync-query
        const entity = await new MockRestaurantCategoryRepository().getById(1)
        expect(entity instanceof RestaurantCategory).toBeTruthy();
    }
    catch(error){
        expect(config.mock_disabled && error instanceof BackendServiceError).toBeTruthy();
    }
});


test('findById con id 1 devuelve algo un tipo RestaurantCategory que tiene createdAt y updatedAt como Date', async () => {
    expect.assertions(1)
    try{
        const repository = new MockRestaurantCategoryRepository()
        // eslint-disable-next-line testing-library/no-await-sync-query
        const entity = await repository.getById(1) ?? new RestaurantCategory()
        expect(entityDatesAreDateIfPresent(entity)).toBeTruthy();
    }
    catch(error){
        expect(config.mock_disabled && error instanceof BackendServiceError).toBeTruthy();
    }
});

const _createMockEntity = ():Promise<RestaurantCategory> => {
    const object = {
        "name": "Mock restaurant category",
        "createdAt": "2023-02-26T20:17:10.000Z",
        "updatedAt": "2023-02-26T20:17:10.000Z"
    }
    return conversor.convertToInternalEntity(object)
}

test('save es capaz de utilizar un conversor para pasar de object a entity', async () => {
    // @ts-ignore
    const newEntity = await _createMockEntity()
    expect(newEntity instanceof RestaurantCategory).toBeTruthy();
});

test('save es capaz de utilizar un conversor para pasar de entity a object',async () => {
    const entity = await _createMockEntity()
    const object = conversor.convertToExternalObject(entity)
    expect(typeof object).toEqual('object');
});


test(`save es capaz de incrementar la length del array a ${collectionLength+1}`, async () => {
    expect.assertions(1)
    try {
        const repository = new MockRestaurantCategoryRepository()
        const newEntity = await _createMockEntity()
        await repository.save(newEntity)
        const entities = await repository.getAll()
        expect(entities.length).toEqual(collectionLength+1);
    }
    catch(error){
        expect(config.mock_disabled && error instanceof BackendServiceError).toBeTruthy();
    }
});

test('save introduce Entities con id numérico', async () => {
    expect.assertions(1)
    try{
        const repository = new MockRestaurantCategoryRepository()
        const newEntity = await _createMockEntity()
        await repository.save(newEntity)
        const entities = await repository.getAll()
        expect(entities.find(entity => typeof entity.id !== 'number')).toBeUndefined();
    }
    catch(error){
        expect(config.mock_disabled && error instanceof BackendServiceError).toBeTruthy();
    }
});

test('save introduce 6 elementos', async () => {
    expect.assertions(1)
    const repository = new MockRestaurantCategoryRepository()
    // @ts-ignore
    const creationPromises = [...Array(6).keys()].map(_ => {
        return _createMockEntity()
    })
    const entities = await Promise.all(creationPromises);
    // @ts-ignore
    const insertionPromises = entities.map(newEntity => {
        return repository.save(newEntity)
    })
    try{
        await Promise.all(insertionPromises);
        const entities = await repository.getAll()
        expect(entities.length).toEqual(collectionLength+6);
    }
    catch(error){
        expect(config.mock_disabled && error instanceof BackendServiceError).toBeTruthy();
    }
});

test('save modifica la entidad 1 y le pone como nombre Mock name', async () => {
    expect.assertions(1)
    try{
        const repository = new MockRestaurantCategoryRepository()
        // eslint-disable-next-line testing-library/no-await-sync-query
        const entity = await repository.getById(1)
        if(entity){
            entity.name = 'Mock name'
            await repository.save(entity);
        }
        // eslint-disable-next-line testing-library/no-await-sync-query
        const updatedEntity = await repository.getById(1)
        expect(updatedEntity?.name).toEqual('Mock name');
    }
    catch(error){
        expect(config.mock_disabled && error instanceof BackendServiceError).toBeTruthy();
    }
});

test('removeById devuelve 0 si el id no existe', async () => {
    expect.assertions(1)
    try{
        const repository = new MockRestaurantCategoryRepository();
        expect(await repository.removeById(-1)).toEqual(0);
    }
    catch(error){
        expect(config.mock_disabled && error instanceof BackendServiceError).toBeTruthy();
    }
});

test('removeById borra el id 1', async () => {
    expect.assertions(1)
    const repository = new MockRestaurantCategoryRepository();
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
        const repository = new MockRestaurantCategoryRepository();
        const oldEntities = await repository.getAll()
        const oldLength = oldEntities.length
        await repository.removeById(1)
        const entities = await repository.getAll()
        expect(entities.length).toEqual(oldLength - 1);
    }
    catch(error){
        expect(config.mock_disabled && error instanceof BackendServiceError).toBeTruthy();
    }
});
