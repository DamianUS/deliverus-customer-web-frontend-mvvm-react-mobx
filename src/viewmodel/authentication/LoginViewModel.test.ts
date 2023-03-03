
import GlobalState from "../GlobalState";
import LoginViewModel from "./LoginViewModel";
import config from "../../config/config"
import User from "../../model/user/User";
import ValidationError from "../../model/errors/ValidationError";
import exp from "constants";

const {mock_disabled} = config
test('LoginViewModel gets a repository injected', () => {
    const viewModel = new LoginViewModel();
    expect(viewModel.authenticationRepository).toBeDefined();
});


test('LoginViewModel gets a GlobalState injected', () => {
    const viewModel = new LoginViewModel();
    expect(viewModel.globalState).toBeDefined();
});

test('LoginViewModel initial globalState loading is false', () => {
    const viewModel = new LoginViewModel();
    expect(viewModel.globalState.loading).toBeFalsy();
});

test('LoginViewModel initial backendError is false', () => {
    const viewModel = new LoginViewModel();
    viewModel.globalState = new GlobalState();
    expect(viewModel.globalState.backendError).toBeUndefined();
});


test('GlobalState is loading when LoginViewModel starts login', () => {
    const viewModel = new LoginViewModel();
    viewModel.login("", "")
    expect(viewModel.globalState.loading).toBeTruthy();
});

test('GlobalState is not loading when LoginViewModel ends login', async () => {
    const viewModel = new LoginViewModel();
    await viewModel.login("", "")
    expect(viewModel.globalState.loading).toBeFalsy();
});

test('LoginViewModel gets a validation error if front-end validation is enabled and a BackendService error or Authorization error otherwise', async () => {
    const viewModel = new LoginViewModel();
    await viewModel.login("bad", "bad");
    if(!viewModel.validationEnabled){
        expect.assertions(2)
        // eslint-disable-next-line jest/no-conditional-expect
        expect(viewModel.loginError === undefined).toEqual(mock_disabled);
        // eslint-disable-next-line jest/no-conditional-expect
        expect(viewModel.globalState.backendError === undefined).toEqual(!mock_disabled);
    }
    else{
        expect.assertions(1)
        // eslint-disable-next-line jest/no-conditional-expect
        expect(viewModel.loginValidationError !== undefined).toEqual(viewModel.validationEnabled)
    }
});

test('LoginViewModel gets a BackendService error or an authorized User with good credentials', async () => {
    const viewModel = new LoginViewModel();
    await viewModel.login("customer1@customer.com", "secret");
    expect(viewModel.globalState.backendError === undefined).toEqual(!mock_disabled);
    expect(viewModel.loggedInUser instanceof User
        && viewModel.loggedInUser.token === "mockToken"
        && viewModel.loggedInUser.tokenExpiration instanceof Date
        && viewModel.loggedInUser.tokenExpiration > new Date()).toEqual(!mock_disabled);
});

test('LoginViewModel gets a BackendService error or the global state gets an authorized User with good credentials', async () => {
    const viewModel = new LoginViewModel();
    await viewModel.login("customer1@customer.com", "secret");
    expect(viewModel.globalState.backendError === undefined).toEqual(!mock_disabled);
    expect(viewModel.globalState.loggedInUser instanceof User
        && viewModel.globalState.loggedInUser.token === "mockToken"
        && viewModel.globalState.loggedInUser.tokenExpiration instanceof Date
        && viewModel.globalState.loggedInUser.tokenExpiration > new Date()).toEqual(!mock_disabled);
});



test('LoginViewModel gets a ValidationError when email and password are not present', async () => {
    const viewModel = new LoginViewModel();
    await viewModel.login("", "");
    expect(viewModel.loginValidationError instanceof ValidationError).toBeTruthy()
});

test('LoginViewModel gets a ValidationError with an errors array when email and password are not present', async () => {
    const viewModel = new LoginViewModel();
    await viewModel.login("", "");
    expect(
        viewModel.loginValidationError instanceof ValidationError
        && viewModel.loginValidationError.errors !== undefined
        && Object.keys(viewModel.loginValidationError.errors).length === 2
        // @ts-ignore
        && viewModel.loginValidationError.errors["email"].length === 1
        // @ts-ignore
        && viewModel.loginValidationError.errors["password"].length === 1
    ).toBeTruthy()
});

test('LoginViewModel gets a ValidationError when password is not present', async () => {
    const viewModel = new LoginViewModel();
    await viewModel.login("thisis@email.com", "");
    expect(viewModel.loginValidationError instanceof ValidationError).toBeTruthy()
});

test('LoginViewModel gets a ValidationError with setted errors when password is not present', async () => {
    const viewModel = new LoginViewModel();
    await viewModel.login("thisis@email.com", "");
    expect(
        viewModel.loginValidationError instanceof ValidationError
        && viewModel.loginValidationError.errors !== undefined
        && Object.keys(viewModel.loginValidationError.errors).length === 1
        // @ts-ignore
        && !('email' in viewModel.loginValidationError.errors)
        // @ts-ignore
        && viewModel.loginValidationError.errors["password"].length === 1
    ).toBeTruthy()
});

test('LoginViewModel gets a ValidationError when email is not present', async () => {
    const viewModel = new LoginViewModel();
    await viewModel.login("", "secret");
    expect(viewModel.loginValidationError instanceof ValidationError).toBeTruthy()
});

test('LoginViewModel gets a ValidationError with setted errors when email is not present', async () => {
    const viewModel = new LoginViewModel();
    await viewModel.login("", "secret");
    expect(
        viewModel.loginValidationError instanceof ValidationError
        && viewModel.loginValidationError.errors !== undefined
        && Object.keys(viewModel.loginValidationError.errors).length === 1
        // @ts-ignore
        && !('password' in viewModel.loginValidationError.errors)
        // @ts-ignore
        && viewModel.loginValidationError.errors["email"].length === 1
    ).toBeTruthy()
});


test('LoginViewModel does not get a ValidationError with setted errors when email is not present if front-end validation is disabled', async () => {
    const viewModel = new LoginViewModel();
    await viewModel.login("", "secret");
    expect(
        viewModel.loginValidationError instanceof ValidationError
        && viewModel.loginValidationError.errors !== undefined
        && Object.keys(viewModel.loginValidationError.errors).length === 1
        // @ts-ignore
        && !('password' in viewModel.loginValidationError.errors)
        // @ts-ignore
        && viewModel.loginValidationError.errors["email"].length === 1
    ).toEqual(viewModel.validationEnabled)
});
