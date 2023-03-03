import BackendServiceError from "../errors/BackendServiceError";
import config from "../../config/config";
import MockAuthenticationRepository from "./MockAuthenticationRepository";
import UnauthorizedError from "../errors/UnauthorizedError";
import User from "../user/User";
import exp from "constants";

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


test('login con datos erróneos devuelve BackendServiceError si está disabled o Unauthorized error en caso contrario', async () => {
    expect.assertions(1)
    try {
        const repository = new MockAuthenticationRepository();
        const user = await repository.login("customer1@customer.com", "secret") as User;
        const loggedOutUser = await repository.logout(user);
        expect(loggedOutUser).toBeDefined()
    }
    catch(error){
        expect(config.mock_disabled && error instanceof BackendServiceError).toBeTruthy();
    }
});
