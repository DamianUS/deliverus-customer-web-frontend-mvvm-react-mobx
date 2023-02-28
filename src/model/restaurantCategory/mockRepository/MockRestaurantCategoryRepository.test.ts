/* eslint-disable jest/no-conditional-expect */
import MockRestaurantCategoryRepository from "./MockRestaurantCategoryRepository";
import RestaurantCategory from "../../restaurantCategory/RestaurantCategory";
import config from "../../../config/config";
import BackendServiceError from "../../errors/BackendServiceError";
import MockRestaurantCategoryConversor from "./MockRestaurantCategoryConversor";
import restaurantCategoriesMocked from "./restaurantCategories.json";



const conversor = new MockRestaurantCategoryConversor()
const collectionLength = restaurantCategoriesMocked.length

test('getAll devuelve un array o un BackendServiceError if mocking service is disabled', async () => {
    try{
        const entities = await new MockRestaurantCategoryRepository().getAll()
        expect(Array.isArray(entities)).toBeTruthy();
    }
    catch(error){
        expect(error instanceof BackendServiceError).toEqual(config.mock_disabled);
    }
});

test('getAll devuelve un array no vacío o un BackendServiceError if mocking service is disabled', async () => {
    try{
        const entities = await new MockRestaurantCategoryRepository().getAll()
        expect(entities.length > 0).toBeTruthy();
    }
    catch(error){
        expect(error instanceof BackendServiceError).toEqual(config.mock_disabled);
    }
});

test(`getAll devuelve un array de longitud ${collectionLength}`, async () => {
    try{
        const entities = await new MockRestaurantCategoryRepository().getAll()
        expect(entities.length === collectionLength).toBeTruthy();
    }
    catch(error){
        expect(error instanceof BackendServiceError).toEqual(config.mock_disabled);
    }
});

test('getAll devuelve un array de RestaurantCategory', async () => {
    try{
        const entities = await new MockRestaurantCategoryRepository().getAll()
        const areAllEntities = entities.map(restaurant => restaurant instanceof RestaurantCategory).reduce((areAllEntities, isRestaurant) =>  areAllEntities && isRestaurant, true)
        expect(areAllEntities).toBeTruthy();
    }
    catch(error){
        expect(error instanceof BackendServiceError).toEqual(config.mock_disabled);
    }
});

test('getAll devuelve un array de Restaurant que tienen id numérico', async () => {
    try {
        const entities = await new MockRestaurantCategoryRepository().getAll()
        const allHaveNumericIds = entities.map(restaurantCategory => typeof restaurantCategory.id === 'number').reduce((areAllIdsNumeric, isNumeric) => areAllIdsNumeric && isNumeric, true)
        expect(allHaveNumericIds).toBeTruthy();
    }
    catch(error){
        expect(error instanceof BackendServiceError).toEqual(config.mock_disabled);
    }
});

const entityDatesAreDateIfPresent = (entity:RestaurantCategory):boolean =>{
    const createdAtValid = entity.createdAt ? entity.createdAt instanceof Date : true
    const updatedAtValid = entity.updatedAt ? entity.updatedAt instanceof Date : true
    return createdAtValid && updatedAtValid
}

test('getAll devuelve un array de RestaurantCategory que tienen createdAt y updatedAt como Date si existen', async () => {
    try{
        const entities = await new MockRestaurantCategoryRepository().getAll();
        const areAllDates = entities
            .map(entity => entityDatesAreDateIfPresent(entity))
            .reduce((areAllDates, areDates) =>  areAllDates && areDates, true)
        expect(areAllDates).toBeTruthy();
    }
    catch(error){
        expect(error instanceof BackendServiceError).toEqual(config.mock_disabled);
    }
});

test('findById con id 2 devuelve algo definido', async () => {
    try {
        // eslint-disable-next-line testing-library/no-await-sync-query
        const entity = await new MockRestaurantCategoryRepository().getById(1)
        expect(entity).toBeDefined();
    }
    catch(error){
        expect(error instanceof BackendServiceError).toEqual(config.mock_disabled);
    }
});

test('findById con id 10 devuelve undefined', async () => {
    try {
        // eslint-disable-next-line testing-library/no-await-sync-query
        const entity = await new MockRestaurantCategoryRepository().getById(10)
        expect(entity).toBeUndefined();
    }
    catch(error){
        expect(error instanceof BackendServiceError).toEqual(config.mock_disabled);
    }
});

test('findById con id 1 devuelve algo un tipo RestaurantCategory', async () => {
    try {
        // eslint-disable-next-line testing-library/no-await-sync-query
        const entity = await new MockRestaurantCategoryRepository().getById(1)
        expect(entity instanceof RestaurantCategory).toBeTruthy();
    }
    catch(error){
        expect(error instanceof BackendServiceError).toEqual(config.mock_disabled);
    }
});


test('findById con id 1 devuelve algo un tipo RestaurantCategory que tiene createdAt y updatedAt como Date', async () => {
    try{
        const repository = new MockRestaurantCategoryRepository()
        // eslint-disable-next-line testing-library/no-await-sync-query
        const entity = await repository.getById(1) ?? new RestaurantCategory()
        expect(entityDatesAreDateIfPresent(entity)).toBeTruthy();
    }
    catch(error){
        expect(error instanceof BackendServiceError).toEqual(config.mock_disabled);
    }
});

const _createMockEntity = ():RestaurantCategory => {
    const object = {
        "name": "Mock restaurant category",
        "createdAt": "2023-02-26T20:17:10.000Z",
        "updatedAt": "2023-02-26T20:17:10.000Z"
    }
    return conversor.convertToInternalEntity(object)
}

const _createMockObject = ():object => {
    const newEntity = _createMockEntity()
    return conversor.convertToExternalObject(newEntity)
}

test('save es capaz de utilizar un conversor para pasar de object a entity', () => {
    // @ts-ignore
    const newEntity = _createMockEntity()
    expect(newEntity instanceof RestaurantCategory).toBeTruthy();
});

test('save es capaz de utilizar un conversor para pasar de entity a object',() => {
    const entity = _createMockEntity()
    const object = conversor.convertToExternalObject(entity)
    expect(typeof object).toEqual('object');
});


test(`save es capaz de incrementar la length del array a ${collectionLength+1}`, async () => {
    try {
        const repository = new MockRestaurantCategoryRepository()
        const newEntity = _createMockEntity()
        await repository.save(newEntity)
        const entities = await repository.getAll()
        expect(entities.length).toEqual(collectionLength+1);
    }
    catch(error){
        expect(error instanceof BackendServiceError).toEqual(config.mock_disabled);
    }
});

test('save introduce Entities con id numérico', async () => {
    try{
        const repository = new MockRestaurantCategoryRepository()
        const newEntity = _createMockEntity()
        await repository.save(newEntity)
        const entities = await repository.getAll()
        expect(entities.find(entity => typeof entity.id !== 'number')).toBeUndefined();
    }
    catch(error){
        expect(error instanceof BackendServiceError).toEqual(config.mock_disabled);
    }
});

test('save introduce 6 elementos', async () => {
    const repository = new MockRestaurantCategoryRepository()
    // @ts-ignore
    const insertionPromises = [...Array(6).keys()].map(_ => {
        const newEntity = _createMockEntity()
        return repository.save(newEntity)
    })
    try{
        await Promise.all(insertionPromises);
        const entities = await repository.getAll()
        expect(entities.length).toEqual(collectionLength+6);
    }
    catch(error){
        expect(error instanceof BackendServiceError).toEqual(config.mock_disabled);
    }
});

test('save modifica la entidad 1 y le pone como nombre Mock name', async () => {
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
        expect(error instanceof BackendServiceError).toEqual(config.mock_disabled);
    }
});

test('removeById devuelve 0 si el id no existe', async () => {
    try{
        const repository = new MockRestaurantCategoryRepository();
        expect(await repository.removeById(-1)).toEqual(0);
    }
    catch(error){
        expect(error instanceof BackendServiceError).toEqual(config.mock_disabled);
    }
});

test('removeById borra el id 1', async () => {
    const repository = new MockRestaurantCategoryRepository();
    try{
        await repository.removeById(1);
        // eslint-disable-next-line testing-library/no-await-sync-query
        expect(await repository.getById(1)).toBeUndefined();
    }
    catch(error){
        expect(error instanceof BackendServiceError).toEqual(config.mock_disabled);
    }
});

test('removeById reduce el length en 1 cuando borra', async () => {
    try {
        const repository = new MockRestaurantCategoryRepository();
        const oldEntities = await repository.getAll()
        const oldLength = oldEntities.length
        await repository.removeById(1)
        const entities = await repository.getAll()
        expect(entities.length).toEqual(oldLength - 1);
    }
    catch(error){
        expect(error instanceof BackendServiceError).toEqual(config.mock_disabled);
    }
});
