
import {injectable} from "inversify";
import 'reflect-metadata'
import { makeAutoObservable } from "mobx"
import BackendServiceError from "../model/errors/BackendServiceError";
import User from "../model/user/User";
import config from "../config/config";


@injectable()
class GlobalState{
    loading:boolean;
    _backendError:BackendServiceError|undefined;
    get backendError():BackendServiceError|undefined{
        return this._backendError;
    }
    set backendError(backendServiceError: BackendServiceError|undefined){
        this._backendError = backendServiceError;
        setTimeout( (globalState:GlobalState) => {
            globalState._backendError = undefined;
        }, 3000, this);
    }
    loggedInUser:User|undefined;
    enabledFrontEndValidation:boolean;


    constructor() {
        this.enabledFrontEndValidation = config.frontend_validation_enabled;
        this.loading = false;
        makeAutoObservable(this)
    }
}

export default GlobalState;
