import MockAuthenticationRepository from "../../model/repositories/mock/authentication/MockAuthenticationRepository";
import config from '../../config/config';
import BackendServiceError from "../../model/errors/BackendServiceError";
import User from "../../model/models/user/User";
import MockLocalStorageStorer from "./MockLocalStorageStorer";
test('MockLocalStorageStorer hace retrieve y obtiene un user o undefined', async () => {
    expect.assertions(1)
    const storer = new MockLocalStorageStorer();
    const retrievedUser = await storer.retrieve()
    expect(retrievedUser === undefined || retrievedUser instanceof User).toBeTruthy()
});

test('MockLocalStorageStorer hace store, devuelve true y es capaz de hacer retrieve back a User', async () => {
    expect.assertions(1)
    const storer = new MockLocalStorageStorer();
    const authRepository = new MockAuthenticationRepository();
    storer.authenticationRepository = authRepository;
    try{
        const loggedInUser = await authRepository.login("customer1@customer.com", "secret") as User;
        const hasStoredToken = storer.store(loggedInUser);
        const retrievedUser = await storer.retrieve()
        expect(hasStoredToken && retrievedUser && retrievedUser.email === loggedInUser.email).toBeTruthy();
    }
    catch(error){
        // eslint-disable-next-line jest/no-conditional-expect
        expect(config.mock_disabled && error instanceof BackendServiceError).toBeTruthy();
    }
});
