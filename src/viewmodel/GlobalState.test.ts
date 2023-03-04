import GlobalState from "./GlobalState";
import BackendServiceError from "../model/errors/BackendServiceError";

test('Initial globalState loading is false', () => {
    const globalState = new GlobalState();
    expect(globalState.loading).toBeFalsy();
});

test('the backendError is initially undefined in GlobalState', () => {
    const globalState = new GlobalState();
    expect(globalState.backendError).toBeUndefined();
});

test('The logged in user is initially undefined in GlobalState', () => {
    const globalState = new GlobalState();
    expect(globalState.loggedInUser).toBeUndefined();
});

test('The backendError is removed after 5 seconds', async () => {
    const globalState = new GlobalState();
    expect(globalState.backendError).toBeUndefined();
    globalState.backendError = new BackendServiceError();
    expect(globalState.backendError instanceof BackendServiceError).toBeTruthy()
    await new Promise((resolve, reject) => {
        setTimeout( (globalState:GlobalState) => {
            resolve(expect(globalState.backendError).toBeUndefined());
        }, 3500, globalState);
    });
});

test('The protected route is undefined in GlobalState at creation', () => {
    const globalState = new GlobalState();
    expect(globalState.protectedRoute).toBeUndefined();
});
