import BaseModelConversor from "../../../conversion/BaseModelConversor";
import User from "../../../models/user/User";
import {convertDateToString, convertToDate} from "../../../conversion/CommonConversionFunctions";
import UserType from "../../../models/user/UserType";

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
class MockUserConversor extends BaseModelConversor<User>{
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
                    if(userTypeEnumerate === UserType.customer){
                        return "customer"
                    }
                    else if(userTypeEnumerate === UserType.owner){
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
            tokenExpiration:{"tokenExpiration": convertToDate},
            userType:{"userType": (sourceTypeName:string) => {
                if(sourceTypeName == "customer"){
                    return UserType.customer
                }
                else if(sourceTypeName == "owner"){
                    return UserType.owner
                }
                return undefined
            }}
        }
    }

}

export default MockUserConversor
export type {MockUserObject}
