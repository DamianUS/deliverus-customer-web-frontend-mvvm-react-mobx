import Model from "../interfaces/Model";

class Conversor<T extends Model>{
    convert(emptyEntity: T, sourceObject: object, mappingRules: Record<string, any>){
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
                // @ts-ignore
                emptyEntity[entityPropertyName] = conversionFunction(conversionValue);
            }
            else if(typeof mappingRule === 'string'){
                // @ts-ignore
                const conversionValue = sourceObject[mappingRule];
                // @ts-ignore
                emptyEntity[entityPropertyName] = conversionFunction(conversionValue);
            }
        })
        return emptyEntity;
    }
}

const convertToDate = (date: string): Date => {
    return new Date(date);
}

export default Conversor
export {convertToDate}
