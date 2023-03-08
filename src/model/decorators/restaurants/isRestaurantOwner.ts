import 'reflect-metadata'
import User from "../../models/user/User";
import ForbiddenError from "../../errors/ForbiddenError";
import Restaurant from "../../models/restaurant/Restaurant";

const getRestaurantAndOrderFromArgs = (args:any) => {
    let restaurantFound:Restaurant|undefined = undefined;
    let ownerFound = undefined;
    args.forEach((argument:any) => {
        if(argument instanceof User)
            ownerFound = argument as User;
        else if(argument instanceof Restaurant)
            restaurantFound = argument as Restaurant;
    });
    return {
        ownerFound: ownerFound,
        restaurantFound: restaurantFound
    };
}
const isRestaurantOwner = () => {
    return function(target: unknown, propertyKey: string, descriptor: PropertyDescriptor) {
        const method = descriptor.value;
        descriptor.value = async function (...args: any) {
            const {restaurantFound, ownerFound} = getRestaurantAndOrderFromArgs(args)
            // @ts-ignore
            if(restaurantFound !== undefined && ownerFound !== undefined && restaurantFound.owner && restaurantFound.owner.id === ownerFound.id){
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

export default isRestaurantOwner
