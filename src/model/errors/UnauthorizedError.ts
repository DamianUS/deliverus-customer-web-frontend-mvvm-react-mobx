class UnauthorizedError extends Error {
    name:string = "Wrong credentials"
    constructor(msg?: string) {
        super(msg ?? "Wrong credentials");
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }
}

export default UnauthorizedError
