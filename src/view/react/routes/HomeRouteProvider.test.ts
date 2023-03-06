import HomeRouteProvider from "./HomeRouteProvider";
import MockAuthenticationRepository from "../../../model/repositories/mock/authentication/MockAuthenticationRepository";
import config from "../../../config/config";
import BackendServiceError from "../../../model/errors/BackendServiceError";
test('HomeRouteProvider devuelve / inicialmente', async () => {
    expect.assertions(1)
    const homeRouteProvider = new HomeRouteProvider();
    expect(homeRouteProvider.homeRoute).toEqual("/");
});


test('HomeRouteProvider devuelve /restaurants cuando se hace login con customer', async () => {
    expect.assertions(1)
    try {
        const repository = new MockAuthenticationRepository();
        const user = await repository.login("customer1@customer.com", "secret")
        const homeRouteProvider = new HomeRouteProvider();
        homeRouteProvider._globalState.loggedInUser = user;
        expect(homeRouteProvider.homeRoute).toEqual("/restaurants");
    }
    catch(error){
        // eslint-disable-next-line jest/no-conditional-expect
        expect(config.mock_disabled && error instanceof BackendServiceError).toBeTruthy();
    }
});

test('HomeRouteProvider devuelve /restaurants-owner cuando se hace login con owner', async () => {
    expect.assertions(1)
    try {
        const repository = new MockAuthenticationRepository();
        const user = await repository.login("owner1@owner.com", "secret")
        const homeRouteProvider = new HomeRouteProvider();
        homeRouteProvider._globalState.loggedInUser = user;
        expect(homeRouteProvider.homeRoute).toEqual(`/restaurants-owner`);
    }
    catch(error){
        // eslint-disable-next-line jest/no-conditional-expect
        expect(config.mock_disabled && error instanceof BackendServiceError).toBeTruthy();
    }
});
