import Model from "../interfaces/Model";
import Conversor from "./interfaces/Conversor";

abstract class BaseConversor<T extends Model> implements Conversor<T>{

    convertToInternalEntity(sourceObject: object):T{
        const emptyEntity = this.getEmptyInternalEntity();
        const mappingRules = this.getMapperToObtainInternalEntity()
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

    convertToExternalObject(entity: T):object{
        const objectWithAllPropertiesEmpty = this.getExternalObjectWithAllPropertiesEmpty()
        const mappingRules = this.getMapperToObtainExternalObject()
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
                if(conversionFunction && conversionValue){
                    // @ts-ignore
                    objectWithAllPropertiesEmpty[objectPropertyName] = conversionFunction(conversionValue);
                }
            }
            else if(typeof mappingRule === 'string'){
                // @ts-ignore
                objectWithAllPropertiesEmpty[objectPropertyName] = entity[mappingRule];
            }
        })
        return objectWithAllPropertiesEmpty;
    }

    abstract getMapperToObtainInternalEntity(): Record<string, any>;
    abstract getMapperToObtainExternalObject(): Record<string, any>;
    abstract getEmptyInternalEntity(): T;
    abstract getExternalObjectWithAllPropertiesEmpty(): object;
}

export default BaseConversor
