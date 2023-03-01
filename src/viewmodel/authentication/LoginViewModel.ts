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


@injectable()
class LoginViewModel{
    authenticationRepository: AuthenticationRepository;
    globalState: GlobalState;
    loginError: UnauthorizedError|undefined;
    loggedInUser: User|undefined;

    constructor() {
        this.authenticationRepository = inversifyContainer.get<AuthenticationRepository>("AuthenticationRepository");
        this.globalState = inversifyContainer.get<GlobalState>("GlobalState")
        makeAutoObservable(this)
    }

    @loadingToggler()
    async login(email:string, password:string) {
        try{
            this.loggedInUser = await this.authenticationRepository.login(email,password);
            this.globalState.loggedInUser = this.loggedInUser
        }
        catch(error){
            if(error instanceof BackendServiceError){
                this.globalState.backendError = error;
            }
            else if(error instanceof UnauthorizedError){
                this.loginError = error
            }
        }
    }
}

export default LoginViewModel;
