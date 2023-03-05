import LoginViewModel from "../../../viewmodel/authentication/LoginViewModel";
import {convertFromValidationErrorToAntDFormFields} from "./ConversorToAntDFormFields";
import config from "../../../config/config";


test('The conversor is able to convert a Login ValidationError to antd fields when email is not present', async () => {
    const viewModel = new LoginViewModel();
    await viewModel.login("", "secret");
    const antdFields = convertFromValidationErrorToAntDFormFields(viewModel.initialValues, viewModel.loginValidationError);
    const isBackendError = config.mock_disabled && viewModel.globalState.backendError !== undefined;
    const isConverted = antdFields
        && antdFields.length === Object.entries(viewModel.initialValues).length
        && antdFields.find(field => field.name === "email" && field.errors !== undefined ) !== undefined
        && antdFields.find(field => field.name === "password" && field.errors !== undefined) === undefined
    // eslint-disable-next-line jest/no-conditional-expect
    expect(isBackendError || isConverted).toBeTruthy()
});

test('The conversor is able to convert a Login ValidationError to antd fields when password is not present', async () => {
    const viewModel = new LoginViewModel();
    await viewModel.login("willy@mail.com", "");
    const antdFields = convertFromValidationErrorToAntDFormFields(viewModel.initialValues, viewModel.loginValidationError);
    const isBackendError = config.mock_disabled && viewModel.globalState.backendError !== undefined;
    const isConverted = antdFields
        && antdFields.length === Object.entries(viewModel.initialValues).length
        && antdFields.find(field => field.name === "email" && field.errors !== undefined ) === undefined
        && antdFields.find(field => field.name === "password" && field.errors !== undefined) !== undefined;
    expect(isBackendError || isConverted).toBeTruthy()
});

test('The conversor is able to convert a Login ValidationError to antd fields when email and password are not present', async () => {
    const viewModel = new LoginViewModel();
    await viewModel.login("", "");
    const antdFields = convertFromValidationErrorToAntDFormFields(viewModel.initialValues, viewModel.loginValidationError);
    const isBackendError = config.mock_disabled && viewModel.globalState.backendError !== undefined;
    const isConverted = antdFields
        && antdFields.length === Object.entries(viewModel.initialValues).length
        && antdFields.find(field => field.name === "email" && field.errors !== undefined ) !== undefined
        && antdFields.find(field => field.name === "password" && field.errors !== undefined) !== undefined;
    expect(isBackendError || isConverted).toBeTruthy()
});
