import BackendServiceError from "../errors/BackendServiceError";
import config from "../../config/config";
import MockAuthenticationRepository from "./MockAuthenticationRepository";
import UnauthorizedError from "../errors/UnauthorizedError";
import User from "../user/User";
import exp from "constants";
import MockUserRepository from "../user/mockRepository/MockUserRepository";

test('login con datos erróneos devuelve BackendServiceError si está disabled o Unauthorized error en caso contrario', async () => {
    expect.assertions(1)
    try {
        const repository = new MockAuthenticationRepository();
        await repository.login("fakeemail@invent.org", "thisPasswordIsIncorrect")
    }
    catch(error){
        // eslint-disable-next-line jest/no-conditional-expect
        expect(config.mock_disabled ? error instanceof BackendServiceError : error instanceof UnauthorizedError).toBeTruthy();
    }
});

test('login con customer1@customer.com/secret devuelve BackendServiceError si está disabled o un User con token y token expiration futura ', async () => {
    expect.assertions(1)
    try {
        const repository = new MockAuthenticationRepository();
        const user = await repository.login("customer1@customer.com", "secret")
        expect(typeof user !== 'undefined'
            && user instanceof User
            && user.token === "mockToken"
            && user.tokenExpiration instanceof Date
            && user.tokenExpiration > new Date()).toBeTruthy()
    }
    catch(error){
        expect(config.mock_disabled && error instanceof BackendServiceError).toBeTruthy();
    }
});


test('logout con devuelve usuario sin token ni expiration date', async () => {
    expect.assertions(1)
    try {
        const repository = new MockAuthenticationRepository();
        const user = await repository.login("customer1@customer.com", "secret") as User;
        const loggedOutUser = await repository.logout(user);
        expect(loggedOutUser && !loggedOutUser.token && !loggedOutUser.tokenExpiration).toBeTruthy();
    }
    catch(error){
        expect(config.mock_disabled && error instanceof BackendServiceError).toBeTruthy();
    }
});


test('login con token customer3token devuelve undefined', async () => {
    expect.assertions(1)
    try {
        const repository = new MockAuthenticationRepository();
        const user = await repository.loginByToken("customer3token");
        expect(user).toBeUndefined();
    }
    catch(error){
        // eslint-disable-next-line jest/no-conditional-expect
        expect(config.mock_disabled && error instanceof BackendServiceError).toBeTruthy();
    }
});

test('login con token customer2token devuelve user con fecha de expiración actualizada', async () => {
    expect.assertions(1)
    try {
        const repository = new MockAuthenticationRepository();
        const userRepository = new MockUserRepository();
        // eslint-disable-next-line testing-library/no-await-sync-query
        const user = await userRepository.getById(3);
        const userRefreshed = await repository.loginByToken("customer2token");
        expect(userRefreshed instanceof User
            && user instanceof User
            && userRefreshed.token
            && userRefreshed.tokenExpiration
            && userRefreshed.tokenExpiration !== user.tokenExpiration).toBeTruthy();
    }
    catch(error){
        expect(config.mock_disabled && error instanceof BackendServiceError).toBeTruthy();
    }
});

