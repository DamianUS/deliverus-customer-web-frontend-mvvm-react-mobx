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
import { object, string} from 'yup';
import * as yup from 'yup';
import TokenStorer from "../../view/services/interfaces/TokenStorer";


@injectable()
class LoginViewModel{
    initialValues: object;
    authenticationRepository: AuthenticationRepository;
    globalState: GlobalState;
    tokenStorer: TokenStorer;
    loginError: UnauthorizedError|undefined;
    loggedInUser: User|undefined;
    loginValidationError: ValidationError|undefined;
    loginSchema = object({
        email: string().required().email(),
        password: string().required()
    });
    _validationEnabled: boolean | undefined;
    get validationEnabled(){
        return this._validationEnabled ?? this.globalState.enabledFrontEndValidation;
    }
    set validationEnabled(newValue:boolean){
        this._validationEnabled = newValue;
    }
    constructor() {
        this.initialValues = { email: '', password: '', remember: true };
        this.authenticationRepository = inversifyContainer.get<AuthenticationRepository>("AuthenticationRepository");
        this.globalState = inversifyContainer.get<GlobalState>("GlobalState");
        this.tokenStorer = inversifyContainer.get<TokenStorer>("TokenStorer");
        makeAutoObservable(this);
    }
    @loadingToggler()
    async login(email:string, password:string) {
        try{
            this.loginValidationError = undefined;
            this.loginError = undefined;
            if(this.validationEnabled){
                await this.loginSchema.validate({email, password}, {abortEarly: false});
            }
            this.loggedInUser = await this.authenticationRepository.login(email,password);
            this.globalState.loggedInUser = this.loggedInUser;
            this.globalState.protectedRoute = undefined;
            this.tokenStorer.store(this.loggedInUser as User);
        }
        catch(error){
            if(error instanceof yup.ValidationError){
                this.loginValidationError = ValidationError.fromYupErrors(error)
            }
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
