class ValidationError extends Error {
    name:string = "A validation error ocurred"
    errors:Record<string,string[]>|undefined
    constructor() {
        super()
        this.errors = undefined
        Object.setPrototypeOf(this, ValidationError.prototype);
    }
}

export default ValidationError
