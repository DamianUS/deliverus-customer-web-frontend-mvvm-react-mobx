import BaseConversor from "../../conversion/BaseConversor";
import User from "../User";
import {convertDateToString, convertToDate} from "../../conversion/CommonConversionFunctions";
import UserType from "../UserType";

type MockUserObject = {
    id: number|undefined,
    firstName: string|undefined,
    lastName: string|undefined,
    email: string|undefined,
    password: string|undefined,
    phone: string|undefined,
    address: string|undefined,
    postalCode: string|undefined,
    userType: string|undefined,
    avatar: string|undefined,
    createdAt: string|undefined,
    updatedAt: string|undefined
}
class MockUserConversor extends BaseConversor<User>{
    getEmptyInternalEntity(): User {
        return new User();
    }

    getExternalObjectWithAllPropertiesEmpty(): MockUserObject {
        return {
            "id": undefined,
            "firstName": undefined,
            "lastName": undefined,
            "email": undefined,
            "password": undefined,
            "phone": undefined,
            "address": undefined,
            "postalCode": undefined,
            "userType": undefined,
            "avatar": undefined,
            "createdAt": undefined,
            "updatedAt": undefined
        };
    }

    getMapperToObtainExternalObject(): Record<string, any> {
        return {
            createdAt:{"createdAt": convertDateToString},
            updatedAt:{"updatedAt": convertDateToString},
            userType:{"userType": (userTypeEnumerate:UserType) => {
                    if(userTypeEnumerate === UserType.Customer){
                        return "customer"
                    }
                    else if(userTypeEnumerate === UserType.Owner){
                        return "owner"
                    }
                    return undefined
                }}
        }
    }

    getMapperToObtainInternalEntity(): Record<string, any> {
        return {
            createdAt:{"createdAt": convertToDate},
            updatedAt:{"updatedAt": convertToDate},
            userType:{"userType": (sourceObject:MockUserObject) => {
                if(sourceObject.userType == "customer"){
                    return UserType.Customer
                }
                else if(sourceObject.userType == "owner"){
                    return UserType.Owner
                }
                return undefined
            }}
        }
    }

}

export default MockUserConversor
export type {MockUserObject}
