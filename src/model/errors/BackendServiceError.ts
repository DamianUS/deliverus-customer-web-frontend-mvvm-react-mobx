class BackendServiceError extends Error {
    name:string = "BackendServiceError"
    constructor(msg?: string) {
        super(msg ?? "Backend service error");
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, BackendServiceError.prototype);
    }
}

export default BackendServiceError