

import GlobalState from "../GlobalState";
import config from "../../config/config"
import User from "../../model/user/User";
import ValidationError from "../../model/errors/ValidationError";
import LogoutViewModel from "./LogoutViewModel";
import BackendServiceError from "../../model/errors/BackendServiceError";

const {mock_disabled} = config
test('LogoutViewModel gets a repository injected', () => {
    const viewModel = new LogoutViewModel();
    expect(viewModel.authenticationRepository).toBeDefined();
});


test('LogoutViewModel gets a GlobalState injected', () => {
    const viewModel = new LogoutViewModel();
    expect(viewModel.globalState).toBeDefined();
});

test('LogoutViewModel initial globalState loading is false', () => {
    const viewModel = new LogoutViewModel();
    expect(viewModel.globalState.loading).toBeFalsy();
});


test('GlobalState is loading when LogoutViewModel starts logging out', () => {
    const viewModel = new LogoutViewModel();
    viewModel.logout();
    expect(viewModel.globalState.loading).toBeTruthy();
});

test('GlobalState is not loading when LogoutViewModel ends logging out', async () => {
    const viewModel = new LogoutViewModel();
    await viewModel.logout();
    expect(viewModel.globalState.loading).toBeFalsy();
});

test('GlobalState has no loggedInUser when LogoutViewModel ends logging out or has a backendError', async () => {
    const viewModel = new LogoutViewModel();
    await viewModel.logout();
    if(mock_disabled){
        // eslint-disable-next-line jest/no-conditional-expect
        expect(viewModel.globalState.backendError).toBeDefined();
    }
    else{
        // eslint-disable-next-line jest/no-conditional-expect
        expect(viewModel.globalState.loggedInUser).toBeUndefined();
    }
});


