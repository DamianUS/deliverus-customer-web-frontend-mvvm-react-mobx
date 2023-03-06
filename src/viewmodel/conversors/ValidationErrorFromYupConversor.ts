import * as yup from "yup";
import ValidationError from "../../model/errors/ValidationError";

const fillErrorObject = (objectToFill:Record<string,string[]>, yupInnerError: yup.ValidationError ):void => {
    const path = yupInnerError.path
    const errors = yupInnerError.errors
    if(typeof path === 'string' && errors.length > 0){
        objectToFill[yupInnerError.path as string]=yupInnerError.errors
    }
}
const validationErrorfromYupError = (yupError:yup.ValidationError):ValidationError => {
    const errorsToBeFilled: Record<string,string[]> = {}
    yupError.inner.forEach((innerError:yup.ValidationError) => fillErrorObject(errorsToBeFilled, innerError))
    const validatorError = new ValidationError()
    validatorError.errors = errorsToBeFilled;
    return validatorError;
}

export default validationErrorfromYupError;