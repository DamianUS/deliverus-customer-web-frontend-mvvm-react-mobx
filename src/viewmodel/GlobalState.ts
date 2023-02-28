
import {injectable} from "inversify";
import 'reflect-metadata'
import { makeAutoObservable } from "mobx"
import BackendServiceError from "../model/errors/BackendServiceError";


@injectable()
class GlobalState{
    loading:boolean;
    backendError!:BackendServiceError;

    constructor() {
        this.loading = false;
        makeAutoObservable(this)
    }
}

export default GlobalState;
