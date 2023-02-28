import GlobalState from "./GlobalState";

test('Initial globalState loading is false', () => {
    const globalState = new GlobalState();
    expect(globalState.loading).toBeFalsy();
});

test('IndexRestaurantViewModel initial backendError is false', () => {
    const globalState = new GlobalState();
    expect(globalState.backendError).toBeUndefined();
});
