import ValidationError from "../../../model/errors/ValidationError";

const _convertFromValidationErrorToAntDFormFields = (validationError: ValidationError):any[]|undefined => {
    if(validationError.errors !== undefined){
        return Object.entries(validationError.errors).map(entry => {
            const [fieldName, fieldErrorsArray] = entry;
            return {name:fieldName as string, errors: fieldErrorsArray as string[]}
        })
    }
}

const _convertFromInitialValuesToAntDFormFields = (initialValues: object):any[]|undefined => {
    return Object.entries(initialValues).map(entry => {
        const [fieldName, _] = entry;
        return {name:fieldName as string, errors: undefined}
    })
}


const convertFromValidationErrorToAntDFormFields = (initialValues: object, validationError: ValidationError|undefined):any[]|undefined => {
    const fields = _convertFromInitialValuesToAntDFormFields(initialValues)
    if(validationError === undefined)
        return fields
    const errorFields = _convertFromValidationErrorToAntDFormFields(validationError)
    if(fields && errorFields){
        const fieldsWithoutErrors = fields.filter(fieldEntry => {
            const hasError = errorFields.find(fieldErrorEntry => fieldErrorEntry.name === fieldEntry.name) !== undefined;
            return !hasError;
        })
        const mergedFields = [...fieldsWithoutErrors, ...errorFields]
        return mergedFields;
    }
}

export {convertFromValidationErrorToAntDFormFields}
