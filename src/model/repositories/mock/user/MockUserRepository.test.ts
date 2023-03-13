/* eslint-disable jest/no-conditional-expect */
import MockUserRepository from "./MockUserRepository";
import config from "../../../../config/config";
import BackendServiceError from "../../../errors/BackendServiceError";
import MockUserConversor from "./MockUserConversor";
import usersMocked from "./users.json";
import User from "../../../models/user/User";
import UserType from "../../../models/user/UserType";
import exp from "constants";
import NotFoundError from "../../../errors/NotFoundError";

// @ts-ignore


const conversor = new MockUserConversor()
const collectionLength = usersMocked.length
test('getAll devuelve un array o un BackendServiceError if mocking service is disabled', async () => {
    expect.assertions(1);
    try{
        const entities = await new MockUserRepository().getAll()
        expect(Array.isArray(entities)).toBeTruthy();
    }
    catch(error){
        expect(config.mock_disabled && error instanceof BackendServiceError).toBeTruthy();
    }
});

test('getAll devuelve un array no vacío o un BackendServiceError if mocking service is disabled', async () => {
    expect.assertions(1);
    try{
        const entities = await new MockUserRepository().getAll()
        expect(entities.length > 0).toBeTruthy();
    }
    catch(error){
        expect(config.mock_disabled && error instanceof BackendServiceError).toBeTruthy();
    }
});

test(`getAll devuelve un array de longitud correcta`, async () => {
    expect.assertions(1);
    try{
        const entities = await new MockUserRepository().getAll()
        expect(entities.length === collectionLength).toBeTruthy();
    }
    catch(error){
        expect(config.mock_disabled && error instanceof BackendServiceError).toBeTruthy();
    }
});

test('getAll devuelve un array de User', async () => {
    expect.assertions(1);
    try {
        const entities = await new MockUserRepository().getAll()
        const areAllEntities = entities.map(entity => entity instanceof User).reduce((areAllEntities, isEntity) => areAllEntities && isEntity, true)
        expect(areAllEntities).toBeTruthy();
    }
    catch(error){
        expect(config.mock_disabled && error instanceof BackendServiceError).toBeTruthy();
    }
});

test('getAll devuelve un array de User y todo con userType', async () => {
    expect.assertions(1);
    try{
        const entities = await new MockUserRepository().getAll()
        // @ts-ignore
        const areAllEntities = entities.map(entity => Object.values(UserType).includes(entity.userType)).reduce((areAllEntities, isEntityAndHasType) =>  areAllEntities && isEntityAndHasType, true)
        return expect(areAllEntities).toBeTruthy();
    }
    catch(error){
        expect(config.mock_disabled && error instanceof BackendServiceError).toBeTruthy();
    }
});

test('getAll devuelve un array que tienen id numérico', async () => {
    expect.assertions(1)
    try {
        const entities = await new MockUserRepository().getAll()
        const allHaveNumericIds = entities.map(restaurantCategory => typeof restaurantCategory.id === 'number').reduce((areAllIdsNumeric, isNumeric) => areAllIdsNumeric && isNumeric, true)
        expect(allHaveNumericIds).toBeTruthy();
    }
    catch(error){
        expect(config.mock_disabled && error instanceof BackendServiceError).toBeTruthy();
    }
});

const entityDatesAreDateIfPresent = (entity:User):boolean =>{
    const createdAtValid = entity.createdAt ? entity.createdAt instanceof Date : true
    const updatedAtValid = entity.updatedAt ? entity.updatedAt instanceof Date : true
    return createdAtValid && updatedAtValid
}

test('getAll devuelve un array de User que tienen createdAt y updatedAt como Date si existen', async () => {
    expect.assertions(1)
    try{
        const entities = await new MockUserRepository().getAll();
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
        const entity = await new MockUserRepository().getById(1)
        expect(entity).toBeDefined();
    }
    catch(error){
        expect(config.mock_disabled && error instanceof BackendServiceError).toBeTruthy();
    }
});

test('findById con id 10 lanza NotFoundError', async () => {
    expect.assertions(1)
    try {
        // eslint-disable-next-line testing-library/no-await-sync-query
        await new MockUserRepository().getById(10)
    }
    catch(error){
        if(config.mock_disabled){
            expect(config.mock_disabled && error instanceof BackendServiceError).toBeTruthy();
        }
        else{
            expect(!config.mock_disabled && error instanceof NotFoundError).toBeTruthy();
        }
    }
});

test('findById con id 1 devuelve algo un tipo User', async () => {
    expect.assertions(1)
    try {
        // eslint-disable-next-line testing-library/no-await-sync-query
        const entity = await new MockUserRepository().getById(1)
        expect(entity instanceof User).toBeTruthy();
    }
    catch(error){
        expect(config.mock_disabled && error instanceof BackendServiceError).toBeTruthy();
    }
});

test('findById con id 1 devuelve algo un tipo User y tiene usertype', async () => {
    expect.assertions(1)
    try {
        // eslint-disable-next-line testing-library/no-await-sync-query
        const entity = await new MockUserRepository().getById(1)
        expect(entity instanceof User && entity.userType !== undefined).toBeTruthy();
    }
    catch(error){
        expect(config.mock_disabled && error instanceof BackendServiceError).toBeTruthy();
    }
});


test('findById con id 1 devuelve algo un tipo User que tiene createdAt y updatedAt como Date', async () => {
    expect.assertions(1)
    try{
        const repository = new MockUserRepository()
        // eslint-disable-next-line testing-library/no-await-sync-query
        const entity = await repository.getById(1) ?? new User()
        expect(entityDatesAreDateIfPresent(entity)).toBeTruthy();
    }
    catch(error){
        expect(config.mock_disabled && error instanceof BackendServiceError).toBeTruthy();
    }
});

const _createMockEntity = ():Promise<User> => {
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


test('save es capaz de utilizar un conversor para pasar de object a entity', async () => {
    // @ts-ignore
    expect.assertions(1)
    const newEntity:User = await _createMockEntity();
    expect(newEntity instanceof User).toBeTruthy();
});

test('save es capaz de utilizar un conversor para pasar de entity a object',async () => {
    expect.assertions(1)
    const entity = await _createMockEntity()
    const object = conversor.convertToExternalObject(entity)
    expect(typeof object).toEqual('object');
});


test(`save es capaz de incrementar la length del array a ${collectionLength+1}`, async () => {
    expect.assertions(1)
    try {
        const repository = new MockUserRepository()
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
        const repository = new MockUserRepository()
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
    const repository = new MockUserRepository()
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

test('save modifica la entidad 1 y le pone como firstName Mock name', async () => {
    expect.assertions(1)
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
        expect(config.mock_disabled && error instanceof BackendServiceError).toBeTruthy();
    }
});

test('removeById devuelve 0 si el id no existe', async () => {
    expect.assertions(1)
    try{
        const repository = new MockUserRepository();
        expect(await repository.removeById(-1)).toEqual(0);
    }
    catch(error){
        expect(config.mock_disabled && error instanceof BackendServiceError).toBeTruthy();
    }
});

test('removeById borra el id 1 y lanza excepción NotFoundError al intentar buscarlo de nuevo', async () => {
    expect.assertions(1)
    const repository = new MockUserRepository();
    try{
        await repository.removeById(1);
        // eslint-disable-next-line testing-library/no-await-sync-query
        await repository.getById(1);
    }
    catch(error){
        if(config.mock_disabled){
            expect(config.mock_disabled && error instanceof BackendServiceError).toBeTruthy();
        }
        else{
            expect(!config.mock_disabled && error instanceof NotFoundError).toBeTruthy();
        }
    }
});

test('removeById reduce el length en 1 cuando borra', async () => {
    expect.assertions(1)
    try {
        const repository = new MockUserRepository();
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


test('findByEmail and password no encuentra datos incorrectos', async () => {
    expect.assertions(1)
    try {
        const repository = new MockUserRepository();
        // eslint-disable-next-line testing-library/no-await-sync-query
        const user = await repository.getByEmailAndPassword("fakeemail@invent.org", "thisPasswordIsIncorrect");
        expect(user).toBeUndefined()
    }
    catch(error){
        expect(config.mock_disabled && error instanceof BackendServiceError).toBeTruthy();
    }
});

test('findByEmail and password encuentra algo con customer1@customer.com/secret', async () => {
    expect.assertions(1)
    try {
        const repository = new MockUserRepository();
        // eslint-disable-next-line testing-library/no-await-sync-query
        const user = await repository.getByEmailAndPassword("customer1@customer.com", "secret");
        expect(user).toBeDefined()
    }
    catch(error){
        expect(config.mock_disabled && error instanceof BackendServiceError).toBeTruthy();
    }
});

test('findByEmail and password encuentra el user id 1 con customer1@customer.com/secret', async () => {
    expect.assertions(1)
    try {
        const repository = new MockUserRepository();
        // eslint-disable-next-line testing-library/no-await-sync-query
        const user = await repository.getByEmailAndPassword("customer1@customer.com", "secret");
        expect(user instanceof User && user.id === 1).toBeTruthy()
    }
    catch(error){
        expect(config.mock_disabled && error instanceof BackendServiceError).toBeTruthy();
    }
});

test('findByToken no encuentra a nadie con faketoken', async () => {
    expect.assertions(1)
    try {
        const repository = new MockUserRepository();
        // eslint-disable-next-line testing-library/no-await-sync-query
        const user = await repository.getByToken("faketoken");
        expect(user).toBeUndefined()
    }
    catch(error){
        expect(config.mock_disabled && error instanceof BackendServiceError).toBeTruthy();
    }
});

test('findByToken no encuentra al usuario con id 4 con customer3token (expirado)', async () => {
    expect.assertions(1)
    try {
        const repository = new MockUserRepository();
        // eslint-disable-next-line testing-library/no-await-sync-query
        const user = await repository.getByToken("customer3token");
        expect(user).toBeUndefined()
    }
    catch(error){
        expect(config.mock_disabled && error instanceof BackendServiceError).toBeTruthy();
    }
});


test('findByToken and password encuentra el user id 3 con customer2token', async () => {
    expect.assertions(1)
    try {
        const repository = new MockUserRepository();
        // eslint-disable-next-line testing-library/no-await-sync-query
        const user = await repository.getByToken("customer2token");
        expect(user instanceof User && user.id === 3).toBeTruthy()
    }
    catch(error){
        expect(config.mock_disabled && error instanceof BackendServiceError).toBeTruthy();
    }
});
