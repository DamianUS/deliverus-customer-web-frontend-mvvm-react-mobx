import GlobalState from "./GlobalState";

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
