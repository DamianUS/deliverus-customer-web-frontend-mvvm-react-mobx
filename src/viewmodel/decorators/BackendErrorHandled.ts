import GlobalState from "../GlobalState";
import 'reflect-metadata'
import inversifyContainer from "../../config/inversify.config";
import BackendServiceError from "../../model/errors/BackendServiceError";

const backendErrorHandled = () => {
    return function(target: unknown, propertyKey: string, descriptor: PropertyDescriptor) {
        const method = descriptor.value;
        descriptor.value = async function (...args: any) {
            const globalState = inversifyContainer.get<GlobalState>("GlobalState")
            globalState.loading = true;
            try{
                let result = method.apply(this, args);
                if(result instanceof Promise){
                    result = await result
                }
                globalState.loading = false;
                return result;
            }
            catch(error){
                globalState.loading = false;
                if(error instanceof BackendServiceError){
                    globalState.backendError = error;
                }
                else{
                    throw error;
                }
            }
        };
    };
}

export default backendErrorHandled
