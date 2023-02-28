
import GlobalState from "../GlobalState";
import LoginViewModel from "./LoginViewModel";
import config from "../../config/config"
import User from "../../model/user/User";
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

test('LoginViewModel gets an BackendService error or Authorization error with wrong credentials', async () => {
    const viewModel = new LoginViewModel();
    await viewModel.login("bad", "bad");
    expect(viewModel.globalState.backendError === undefined).toEqual(!mock_disabled);
    expect(viewModel.loginError === undefined).toEqual(mock_disabled);
});

test('LoginViewModel gets an BackendService error or an authorized User error with good credentials', async () => {
    const viewModel = new LoginViewModel();
    await viewModel.login("customer1@customer.com", "secret");
    expect(viewModel.globalState.backendError === undefined).toEqual(!mock_disabled);
    expect(viewModel.loggedInUser instanceof User
        && viewModel.loggedInUser.token === "mockToken"
        && viewModel.loggedInUser.tokenExpiration instanceof Date
        && viewModel.loggedInUser.tokenExpiration > new Date()).toEqual(!mock_disabled);
});
