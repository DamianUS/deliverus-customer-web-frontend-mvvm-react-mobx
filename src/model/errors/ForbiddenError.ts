class ForbiddenError extends Error {
    name:string = "Not enough privileges"
    constructor(msg?: string) {
        super(msg ?? "Not enough privileges");
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, ForbiddenError.prototype);
    }
}

export default ForbiddenError
