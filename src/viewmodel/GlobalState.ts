
import {injectable} from "inversify";
import 'reflect-metadata'
import { makeAutoObservable } from "mobx"
import BackendServiceError from "../model/errors/BackendServiceError";
import User from "../model/user/User";
import config from "../config/config";
import UnauthorizedError from "../model/errors/UnauthorizedError";
import ForbiddenError from "../model/errors/ForbiddenError";


@injectable()
class GlobalState{
    protectedRoute: string|undefined;
    enabledFrontEndValidation:boolean;

    _loading:boolean;
    get loading():boolean{
        return this._loading;
    }
    set loading(loading: boolean){
        this._loading = loading;
    }
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
    _loggedInUser:User|undefined;
    get loggedInUser():User|undefined{
        return this._loggedInUser;
    }
    set loggedInUser(loggedInUser: User|undefined){
        this._loggedInUser = loggedInUser;
    }
    _authenticationError:UnauthorizedError|undefined;
    get authenticationError():UnauthorizedError|undefined{
        return this._authenticationError;
    }
    set authenticationError(authenticationError: UnauthorizedError|undefined){
        this._authenticationError = authenticationError;
    }
    _forbiddenError:ForbiddenError|undefined;
    get forbiddenError():ForbiddenError|undefined{
        return this._forbiddenError;
    }
    set forbiddenError(forbiddenError: UnauthorizedError|undefined){
        this._forbiddenError = forbiddenError;
    }

    constructor() {
        this._loading = false;
        this.enabledFrontEndValidation = config.frontend_validation_enabled;
        this.loading = false;
        makeAutoObservable(this)
    }
}

export default GlobalState;
