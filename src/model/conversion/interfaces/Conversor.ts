import Model from "../../interfaces/Model";

interface Conversor<T extends Model>{
    convertToInternalEntity(sourceExternalObject: object):T;
    convertToExternalObject(entity: T):object;
    //Expected formats for mapper
    //Case 1: {key1: {key2, value} -> key1 is the name of the target entity's property, whilst key2 is the name of the external object property, and value is the function to pass from key2 -> key1
    //Case 2: {key1: value} -> -> key1 is the name of the target entity's property, whilst key2 is the name of the external object property, that will be exported to key1.
    //All keys int the internal entity obtained in getEmptyInternalEntity that are present in the external object will be retrieved if no rule is defined.
    getMapperToObtainInternalEntity():Record<string, any>;
    //Expected formats for mapper
    //Case 1: {key1: {key2, value} -> key1 is the name of the target external object's property, whilst key2 is the name of the internal entity property, and value is the function to pass from key2 -> key1
    //Case 2: {key1: value} -> -> key1 is the name of the target external object's property, whilst key2 is the name of the internal entity property, that will be exported to key1.
    //All keys int the external target object obtained in getExternalObjectWithAllPropertiesEmpty that are present in the internal entity will be retrieved if no rule is defined.
    getMapperToObtainExternalObject():Record<string, any>;
    getExternalObjectWithAllPropertiesEmpty():object;
    getEmptyInternalEntity():T;

}

export default Conversor
