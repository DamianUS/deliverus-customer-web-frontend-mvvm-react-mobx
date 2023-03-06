import 'reflect-metadata'
import config from "../../config/config";
import BackendServiceError from "../errors/BackendServiceError";
import User from "../models/user/User";
import UnauthorizedError from "../errors/UnauthorizedError";

const isLoggedInUser = (argument: any) => {
    if(!(argument instanceof User))
        return false;
    const user = argument as User;
    return typeof user.token === 'string' && user.tokenExpiration instanceof Date && user.tokenExpiration > new Date();
}
const hasLoggedInUserParameter = () => {
    return function(target: unknown, propertyKey: string, descriptor: PropertyDescriptor) {
        const method = descriptor.value;
        descriptor.value = async function (...args: any) {
            const hasLoggedInUserParameter = args.reduce((hasFoundLoggedInUser:boolean, argument:any) => hasFoundLoggedInUser || isLoggedInUser(argument), false)
            if(hasLoggedInUserParameter){
                return method.apply(this, args);
            }
            else{
                return new Promise((resolve, reject) => {
                    reject(new UnauthorizedError())
                });
            }
        };
    };
}

export default hasLoggedInUserParameter
