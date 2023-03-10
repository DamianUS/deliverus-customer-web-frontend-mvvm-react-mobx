
import GlobalState from "../GlobalState";
import LoginViewModel from "./LoginViewModel";
import config from "../../config/config"
import User from "../../model/models/user/User";
import ValidationError from "../../model/errors/ValidationError";
import exp from "constants";
import BackendServiceError from "../../model/errors/BackendServiceError";

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
    viewModel.login("", "");
    expect(viewModel.globalState.loading).toBeTruthy();
});

test('GlobalState is not loading when LoginViewModel ends login', async () => {
    const viewModel = new LoginViewModel();
    await viewModel.login("", "");
    expect(viewModel.globalState.loading).toBeFalsy();
});

test('LoginViewModel gets a BackendService error or Authorization error otherwise', async () => {
    expect.assertions(1)
    const viewModel = new LoginViewModel();
    await viewModel.login("bad@bad.com", "bad");
    const isBackendServiceError = mock_disabled && viewModel.globalState.backendError !== undefined;
    const isLoginError = !mock_disabled && viewModel.loginError !== undefined;
    expect(isBackendServiceError || isLoginError).toBeTruthy();
});

test('LoginViewModel gets a BackendService error or the global state gets an authorized User with good credentials', async () => {
    const viewModel = new LoginViewModel();
    await viewModel.login("customer1@customer.com", "secret");
    const isBackendError = config.mock_disabled && viewModel.globalState.backendError !== undefined;
    const isLoggedIn = viewModel.globalState.loggedInUser instanceof User
        && viewModel.globalState.loggedInUser.token === "mockToken"
        && viewModel.loggedInUser instanceof User
        && viewModel.loggedInUser.token === "mockToken"
        && viewModel.globalState.loggedInUser.tokenExpiration instanceof Date
        && viewModel.globalState.loggedInUser.tokenExpiration > new Date();
    expect(isBackendError || isLoggedIn).toBeTruthy()
});



test('LoginViewModel gets a ValidationError when email and password are not present', async () => {
    const viewModel = new LoginViewModel();
    await viewModel.login("", "");
    const isBackendError = config.mock_disabled && viewModel.globalState.backendError !== undefined;
    expect(isBackendError || viewModel.loginValidationError instanceof ValidationError).toBeTruthy()
});

test('LoginViewModel gets a ValidationError with an errors array when email and password are not present', async () => {
    const viewModel = new LoginViewModel();
    await viewModel.login("", "");
    const isBackendError = config.mock_disabled && viewModel.globalState.backendError !== undefined;
    const isValidationError = viewModel.loginValidationError instanceof ValidationError
        && viewModel.loginValidationError.errors !== undefined
        && Object.keys(viewModel.loginValidationError.errors).length === 2
        // @ts-ignore
        && viewModel.loginValidationError.errors["email"].length === 1
        // @ts-ignore
        && viewModel.loginValidationError.errors["password"].length === 1;
    expect(isBackendError || isValidationError).toBeTruthy()
});

test('LoginViewModel gets a ValidationError when password is not present', async () => {
    const viewModel = new LoginViewModel();
    await viewModel.login("thisis@email.com", "");
    const isBackendError = config.mock_disabled && viewModel.globalState.backendError !== undefined;
    expect(isBackendError || viewModel.loginValidationError instanceof ValidationError).toBeTruthy();
});

test('LoginViewModel gets a ValidationError with setted errors when password is not present', async () => {
    const viewModel = new LoginViewModel();
    await viewModel.login("thisis@email.com", "");
    const isBackendError = config.mock_disabled && viewModel.globalState.backendError !== undefined;
    const isValidationError = viewModel.loginValidationError instanceof ValidationError
        && viewModel.loginValidationError.errors !== undefined
        && Object.keys(viewModel.loginValidationError.errors).length === 1
        // @ts-ignore
        && !('email' in viewModel.loginValidationError.errors)
        // @ts-ignore
        && viewModel.loginValidationError.errors["password"].length === 1;
    expect(isBackendError || isValidationError).toBeTruthy();
});

test('LoginViewModel gets a ValidationError when email is not present', async () => {
    const viewModel = new LoginViewModel();
    await viewModel.login("", "secret");
    const isBackendError = config.mock_disabled && viewModel.globalState.backendError !== undefined;
    expect(isBackendError || viewModel.loginValidationError instanceof ValidationError).toBeTruthy();
});

test('LoginViewModel gets a ValidationError with setted errors when email is not present', async () => {
    const viewModel = new LoginViewModel();
    await viewModel.login("", "secret");
    const isBackendError = config.mock_disabled && viewModel.globalState.backendError !== undefined;
    const isValidationError = viewModel.loginValidationError instanceof ValidationError
        && viewModel.loginValidationError.errors !== undefined
        && Object.keys(viewModel.loginValidationError.errors).length === 1
        // @ts-ignore
        && !('password' in viewModel.loginValidationError.errors)
        // @ts-ignore
        && viewModel.loginValidationError.errors["email"].length === 1;
    expect(isBackendError || isValidationError).toBeTruthy()
});


test('LoginViewModel keeps the protected route when login fails', async () => {
    const viewModel = new LoginViewModel();
    await viewModel.login("", "secret");
    viewModel.globalState.protectedRoute = "/restaurants";
    const isBackendError = config.mock_disabled && viewModel.globalState.backendError !== undefined;
    const keepsRoute = viewModel.loginValidationError instanceof ValidationError
        && viewModel.loginValidationError.errors !== undefined
        && Object.keys(viewModel.loginValidationError.errors).length === 1
        // @ts-ignore
        && !('password' in viewModel.loginValidationError.errors)
        // @ts-ignore
        && viewModel.loginValidationError.errors["email"].length === 1
        && viewModel.globalState.protectedRoute !== undefined;
    expect(isBackendError || keepsRoute).toBeTruthy()
});


test('LoginViewModel removes the protected route when login is successful', async () => {
    const viewModel = new LoginViewModel();
    viewModel.globalState.protectedRoute = "/restaurants";
    await viewModel.login("customer1@customer.com", "secret");
    const isBackendError = config.mock_disabled && viewModel.globalState.backendError !== undefined;
    const routeRemoved = viewModel.globalState.loggedInUser instanceof User
        && viewModel.globalState.loggedInUser.token === "mockToken"
        && viewModel.loggedInUser instanceof User
        && viewModel.loggedInUser.token === "mockToken"
        && viewModel.globalState.loggedInUser.tokenExpiration instanceof Date
        && viewModel.globalState.loggedInUser.tokenExpiration > new Date()
        && viewModel.globalState.protectedRoute === undefined;
    expect(isBackendError || routeRemoved).toBeTruthy()
});
