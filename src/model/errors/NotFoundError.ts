class NotFoundError extends Error {
    name:string = "Not found"
    constructor(msg?: string) {
        super(msg ?? "Not found");
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}

export default NotFoundError
