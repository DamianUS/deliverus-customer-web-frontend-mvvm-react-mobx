
import {injectable} from "inversify";
import 'reflect-metadata'
import { makeAutoObservable } from "mobx"
import BackendServiceError from "../model/errors/BackendServiceError";
import User from "../model/user/User";


@injectable()
class GlobalState{
    loading:boolean;
    backendError!:BackendServiceError;
    loggedInUser:User|undefined;

    constructor() {
        this.loading = false;
        makeAutoObservable(this)
    }
}

export default GlobalState;
