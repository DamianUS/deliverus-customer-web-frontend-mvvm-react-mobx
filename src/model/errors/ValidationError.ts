import * as yup from 'yup'

const fillErrorObject = (objectToFill:Record<string,string[]>, yupInnerError: yup.ValidationError ):void => {
    const path = yupInnerError.path
    const errors = yupInnerError.errors
    if(typeof path === 'string' && errors.length > 0){
        objectToFill[yupInnerError.path as string]=yupInnerError.errors
    }
}
class ValidationError extends Error {
    name:string = "A validation error ocurred"
    errors:Record<string,string[]>|undefined
    constructor() {
        super()
        this.errors = undefined
        Object.setPrototypeOf(this, ValidationError.prototype);
    }

    static fromYupErrors(yupError:yup.ValidationError):ValidationError {
        const errorsToBeFilled: Record<string,string[]> = {}
        yupError.inner.forEach((innerError:yup.ValidationError) => fillErrorObject(errorsToBeFilled, innerError))
        const validatorError = new ValidationError()
        validatorError.errors = errorsToBeFilled;
        return validatorError;
    }

}

export default ValidationError
