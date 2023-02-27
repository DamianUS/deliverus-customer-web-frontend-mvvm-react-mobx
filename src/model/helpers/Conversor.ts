import Model from "../interfaces/Model";

class Conversor<T extends Model>{
    convertToEntity(emptyEntity: T, sourceObject: object, mappingRules: Record<string, any>):T{
        emptyEntity.getProperties().forEach(entityPropertyName => {
            const mappingRule = mappingRules[entityPropertyName];
            if(!mappingRule){
                // @ts-ignore
                emptyEntity[entityPropertyName] = sourceObject[entityPropertyName];
            }
            else if(typeof mappingRule === 'object'){
                const conversionFunction = Object.values(mappingRule)[0];
                // @ts-ignore
                const conversionValue = sourceObject[Object.keys(mappingRule)[0]];
                if(conversionValue && conversionFunction){
                    // @ts-ignore
                    emptyEntity[entityPropertyName] = conversionFunction(conversionValue);
                }
            }
            else if(typeof mappingRule === 'string'){
                // @ts-ignore
                emptyEntity[entityPropertyName] = sourceObject[mappingRule];
            }
        })
        return emptyEntity;
    }

    convertToObject(entity: T, objectWithAllPropertiesEmpty:object, mappingRules: Record<string, any>):object{
        Object.keys(objectWithAllPropertiesEmpty).forEach(objectPropertyName => {
            const mappingRule = mappingRules[objectPropertyName];
            if(!mappingRule){
                // @ts-ignore
                objectWithAllPropertiesEmpty[objectPropertyName] = entity[objectPropertyName];
            }
            else if(typeof mappingRule === 'object'){
                const conversionFunction = Object.values(mappingRule)[0];
                // @ts-ignore
                const conversionValue = entity[Object.keys(mappingRule)[0]];
                // @ts-ignore
                objectWithAllPropertiesEmpty[objectPropertyName] = conversionFunction(conversionValue);
            }
            else if(typeof mappingRule === 'string'){
                // @ts-ignore
                objectWithAllPropertiesEmpty[objectPropertyName] = entity[mappingRule];
            }
        })
        return objectWithAllPropertiesEmpty;
    }
}

const convertToDate = (date: string): Date => {
    return new Date(date);
}

const convertDateToString = (date: Date): string => {
    return date.toISOString();
}

export default Conversor
export {convertToDate, convertDateToString}
