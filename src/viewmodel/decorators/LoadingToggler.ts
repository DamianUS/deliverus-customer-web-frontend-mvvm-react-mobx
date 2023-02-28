import GlobalState from "../GlobalState";
import 'reflect-metadata'
import inversifyContainer from "../../config/inversify.config";

const loadingToggler = () => {
    return function(target: unknown, propertyKey: string, descriptor: PropertyDescriptor) {
        const method = descriptor.value;
        descriptor.value = async function (...args: any) {
            const globalState = inversifyContainer.get<GlobalState>("GlobalState")
            globalState.loading = true;
            let result = method.apply(this, args);
            if(result instanceof Promise){
                result = await result
            }
            globalState.loading = false;
            return result;
        };
    };
}

export default loadingToggler
