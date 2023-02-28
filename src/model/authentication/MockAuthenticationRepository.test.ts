import BackendServiceError from "../errors/BackendServiceError";
import config from "../../config/config";
import MockAuthenticationRepository from "./MockAuthenticationRepository";
import UnauthorizedError from "../errors/UnauthorizedError";
import User from "../user/User";

test('login con datos erróneos devuelve BackendServiceError si está disabled o Unauthorized error en caso contrario', async () => {
    try {
        const repository = new MockAuthenticationRepository();
        await repository.login("fakeemail@invent.org", "thisPasswordIsIncorrect")
    }
    catch(error){
        expect(error instanceof BackendServiceError).toEqual(config.mock_disabled);
        expect(error instanceof UnauthorizedError).toEqual(!config.mock_disabled);
    }
});

test('login con customer1@customer.com/secret devuelve BackendServiceError si está disabled o un User con token y token expiration futura ', async () => {
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
        expect(error instanceof BackendServiceError).toEqual(config.mock_disabled);
    }
});
