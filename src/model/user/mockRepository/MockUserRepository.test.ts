/* eslint-disable jest/no-conditional-expect */
import MockUserRepository from "./MockUserRepository";
import config from "../../../config/config";
import BackendServiceError from "../../errors/BackendServiceError";
import MockUserConversor from "./MockUserConversor";
import usersMocked from "./users.json";
import User from "../User";

// @ts-ignore


const conversor = new MockUserConversor()
const collectionLength = usersMocked.length
test('getAll devuelve un array o un BackendServiceError if mocking service is disabled', async () => {
    try{
        const entities = await new MockUserRepository().getAll()
        expect(Array.isArray(entities)).toBeTruthy();
    }
    catch(error){
        expect(error instanceof BackendServiceError).toEqual(config.mock_disabled);
    }
});

test('getAll devuelve un array no vacío o un BackendServiceError if mocking service is disabled', async () => {
    try{
        const entities = await new MockUserRepository().getAll()
        expect(entities.length > 0).toBeTruthy();
    }
    catch(error){
        expect(error instanceof BackendServiceError).toEqual(config.mock_disabled);
    }
});

test(`getAll devuelve un array de longitud ${collectionLength}`, async () => {
    try{
        const entities = await new MockUserRepository().getAll()
        expect(entities.length === collectionLength).toBeTruthy();
    }
    catch(error){
        expect(error instanceof BackendServiceError).toEqual(config.mock_disabled);
    }
});

test('getAll devuelve un array de User', async () => {
    try{
        const entities = await new MockUserRepository().getAll()
        const areAllEntities = entities.map(restaurant => restaurant instanceof User).reduce((areAllEntities, isRestaurant) =>  areAllEntities && isRestaurant, true)
        expect(areAllEntities).toBeTruthy();
    }
    catch(error){
        expect(error instanceof BackendServiceError).toEqual(config.mock_disabled);
    }
});

test('getAll devuelve un array que tienen id numérico', async () => {
    try {
        const entities = await new MockUserRepository().getAll()
        const allHaveNumericIds = entities.map(restaurantCategory => typeof restaurantCategory.id === 'number').reduce((areAllIdsNumeric, isNumeric) => areAllIdsNumeric && isNumeric, true)
        expect(allHaveNumericIds).toBeTruthy();
    }
    catch(error){
        expect(error instanceof BackendServiceError).toEqual(config.mock_disabled);
    }
});

const entityDatesAreDateIfPresent = (entity:User):boolean =>{
    const createdAtValid = entity.createdAt ? entity.createdAt instanceof Date : true
    const updatedAtValid = entity.updatedAt ? entity.updatedAt instanceof Date : true
    return createdAtValid && updatedAtValid
}

test('getAll devuelve un array de User que tienen createdAt y updatedAt como Date si existen', async () => {
    try{
        const entities = await new MockUserRepository().getAll();
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
        const entity = await new MockUserRepository().getById(1)
        expect(entity).toBeDefined();
    }
    catch(error){
        expect(error instanceof BackendServiceError).toEqual(config.mock_disabled);
    }
});

test('findById con id 10 devuelve undefined', async () => {
    try {
        // eslint-disable-next-line testing-library/no-await-sync-query
        const entity = await new MockUserRepository().getById(10)
        expect(entity).toBeUndefined();
    }
    catch(error){
        expect(error instanceof BackendServiceError).toEqual(config.mock_disabled);
    }
});

test('findById con id 1 devuelve algo un tipo User', async () => {
    try {
        // eslint-disable-next-line testing-library/no-await-sync-query
        const entity = await new MockUserRepository().getById(1)
        expect(entity instanceof User).toBeTruthy();
    }
    catch(error){
        expect(error instanceof BackendServiceError).toEqual(config.mock_disabled);
    }
});


test('findById con id 1 devuelve algo un tipo User que tiene createdAt y updatedAt como Date', async () => {
    try{
        const repository = new MockUserRepository()
        // eslint-disable-next-line testing-library/no-await-sync-query
        const entity = await repository.getById(1) ?? new User()
        expect(entityDatesAreDateIfPresent(entity)).toBeTruthy();
    }
    catch(error){
        expect(error instanceof BackendServiceError).toEqual(config.mock_disabled);
    }
});

const _createMockEntity = ():User => {
    const object = {
        "firstName": "Mocked customer",
        "lastName": "Fake 1",
        "email": "customer1@customer.com",
        "password": "secret",
        "phone": "+3466677888",
        "address": "Fake street 123",
        "postalCode": "41010",
        "userType": "customer",
        "avatar": "/maleavatar.png"
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
    expect(newEntity instanceof User).toBeTruthy();
});

test('save es capaz de utilizar un conversor para pasar de entity a object',() => {
    const entity = _createMockEntity()
    const object = conversor.convertToExternalObject(entity)
    expect(typeof object).toEqual('object');
});


test(`save es capaz de incrementar la length del array a ${collectionLength+1}`, async () => {
    try {
        const repository = new MockUserRepository()
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
        const repository = new MockUserRepository()
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
    const repository = new MockUserRepository()
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

test('save modifica la entidad 1 y le pone como firstName Mock name', async () => {
    try{
        const repository = new MockUserRepository()
        // eslint-disable-next-line testing-library/no-await-sync-query
        const entity = await repository.getById(1)
        if(entity){
            entity.firstName = 'Mock name'
            await repository.save(entity);
        }
        // eslint-disable-next-line testing-library/no-await-sync-query
        const updatedEntity = await repository.getById(1)
        expect(updatedEntity?.firstName).toEqual('Mock name');
    }
    catch(error){
        expect(error instanceof BackendServiceError).toEqual(config.mock_disabled);
    }
});

test('removeById devuelve 0 si el id no existe', async () => {
    try{
        const repository = new MockUserRepository();
        expect(await repository.removeById(-1)).toEqual(0);
    }
    catch(error){
        expect(error instanceof BackendServiceError).toEqual(config.mock_disabled);
    }
});

test('removeById borra el id 1', async () => {
    const repository = new MockUserRepository();
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
        const repository = new MockUserRepository();
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


test('findByEmail and password no encuentra datos incorrectos', async () => {
    try {
        const repository = new MockUserRepository();
        // eslint-disable-next-line testing-library/no-await-sync-query
        const user = await repository.getByEmailAndPassword("fakeemail@invent.org", "thisPasswordIsIncorrect");
        expect(user).toBeUndefined()
    }
    catch(error){
        expect(error instanceof BackendServiceError).toEqual(config.mock_disabled);
    }
});

test('findByEmail and password encuentra algo con customer1@customer.com/secret', async () => {
    try {
        const repository = new MockUserRepository();
        // eslint-disable-next-line testing-library/no-await-sync-query
        const user = await repository.getByEmailAndPassword("customer1@customer.com", "secret");
        expect(user).toBeDefined()
    }
    catch(error){
        expect(error instanceof BackendServiceError).toEqual(config.mock_disabled);
    }
});

test('findByEmail and password encuentra el user id 1 con customer1@customer.com/secret', async () => {
    try {
        const repository = new MockUserRepository();
        // eslint-disable-next-line testing-library/no-await-sync-query
        const user = await repository.getByEmailAndPassword("customer1@customer.com", "secret");
        expect(user instanceof User && user.id === 1).toBeTruthy()
    }
    catch(error){
        expect(error instanceof BackendServiceError).toEqual(config.mock_disabled);
    }
});
