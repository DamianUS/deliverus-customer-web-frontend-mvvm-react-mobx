import inversifyContainer from "../../config/inversify.config";
import BackendServiceError from "../../model/errors/BackendServiceError";
import {injectable} from "inversify";
import 'reflect-metadata'
import { makeAutoObservable } from "mobx"
import GlobalState from "../GlobalState";
import UnauthorizedError from "../../model/errors/UnauthorizedError";
import AuthenticationRepository from "../../model/authentication/interfaces/AuthenticationRepository";
import loadingToggler from "../decorators/LoadingToggler";
import User from "../../model/user/User";
import ValidationError from "../../model/errors/ValidationError";
import { object, string, number, date, InferType} from 'yup';
import * as yup from 'yup';
import React from "react";


@injectable()
class LogoutViewModel{
    authenticationRepository: AuthenticationRepository;
    globalState: GlobalState;

    constructor() {
        this.authenticationRepository = inversifyContainer.get<AuthenticationRepository>("AuthenticationRepository");
        this.globalState = inversifyContainer.get<GlobalState>("GlobalState")
        makeAutoObservable(this)
    }
    @loadingToggler()
    async logout() {
        if(this.globalState.loggedInUser !== undefined){
            try{
                await this.authenticationRepository.logout(this.globalState.loggedInUser);
                this.globalState.loggedInUser = undefined;
            }
            catch(error){
                if(error instanceof BackendServiceError){
                    this.globalState.backendError = error;
                }
            }
        }

    }
}

export default LogoutViewModel;
