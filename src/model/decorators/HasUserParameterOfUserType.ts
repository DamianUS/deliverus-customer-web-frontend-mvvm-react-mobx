import 'reflect-metadata'
import config from "../../config/config";
import BackendServiceError from "../errors/BackendServiceError";
import User from "../models/user/User";
import UnauthorizedError from "../errors/UnauthorizedError";
import UserType from "../models/user/UserType";
import ForbiddenError from "../errors/ForbiddenError";

const isUserWithUserType = (argument: any, userType: UserType) => {
    if(!(argument instanceof User))
        return false;
    const user = argument as User;
    return user.userType === userType;
}
const hasUserParameterOfUserType = (userType: UserType) => {
    return function(target: unknown, propertyKey: string, descriptor: PropertyDescriptor) {
        const method = descriptor.value;
        descriptor.value = async function (...args: any) {
            const hasUserParameterOfUserType = args.reduce((hasFoundLoggedInUser:boolean, argument:any) => hasFoundLoggedInUser || isUserWithUserType(argument, userType), false)
            if(hasUserParameterOfUserType){
                return method.apply(this, args);
            }
            else{
                return new Promise((resolve, reject) => {
                    reject(new ForbiddenError())
                });
            }
        };
    };
}

export default hasUserParameterOfUserType
