import BackendServiceError from "../../../errors/BackendServiceError";
import config from "../../../../config/config";
const disableable = () => {
    return function(target: unknown, propertyKey: string, descriptor: PropertyDescriptor) {
        const method = descriptor.value;
        descriptor.value = function (...args: any) {
            if(config.mock_disabled)
                return new Promise((resolve, reject) => {
                    reject(new BackendServiceError())
                });
            return method.apply(this, args);
        };
    };
}

export default disableable
