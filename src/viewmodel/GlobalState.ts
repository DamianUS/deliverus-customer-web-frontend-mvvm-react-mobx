
import {injectable} from "inversify";
import 'reflect-metadata'
import { makeAutoObservable } from "mobx"
import BackendServiceError from "../model/errors/BackendServiceError";
import User from "../model/user/User";
import config from "../config/config";


@injectable()
class GlobalState{
    _loading:boolean;
    get loading():boolean{
        return this._loading;
    }
    set loading(loading: boolean){
        this._loading = loading;
    }
    _backendError:BackendServiceError|undefined;
    protectedRoute: string|undefined;
    get backendError():BackendServiceError|undefined{
        return this._backendError;
    }
    set backendError(backendServiceError: BackendServiceError|undefined){
        this._backendError = backendServiceError;
        setTimeout( (globalState:GlobalState) => {
            globalState._backendError = undefined;
        }, 3000, this);
    }
    _loggedInUser:User|undefined;
    get loggedInUser():User|undefined{
        return this._loggedInUser;
    }
    set loggedInUser(loggedInUser: User|undefined){
        this._loggedInUser = loggedInUser;
    }
    enabledFrontEndValidation:boolean;


    constructor() {
        this._loading = false;
        this.enabledFrontEndValidation = config.frontend_validation_enabled;
        this.loading = false;
        makeAutoObservable(this)
    }
}

export default GlobalState;
